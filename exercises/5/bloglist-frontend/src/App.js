import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import _ from 'lodash'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const emptyNotification = { success: null, message: null }
  const [notification, setNotification] = useState(emptyNotification)
  const blogFormRef = useRef()

  const notify = (success, message) => {
    setNotification({ success: success, message: message })
    setTimeout(() => {
      setNotification(emptyNotification)
    }, 3000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notify(true, `Welcome ${user.name}!`)
    } catch (exception) {
      notify(false, 'Wrong credentials')
    }
  }

  const handleLogOut = () => {
    notify(true, `Logged out ${user.name}`)
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification({
          success: true,
          message: `A new blog ${blogObject.title} by ${blogObject.author} added`
        })
      })
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          required
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          required
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <Notification success={notification.success} message={notification.message} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification success={notification.success} message={notification.message} />
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={handleLogOut}>Log Out</button>
      </div>
      <h3>create new</h3>
      <div>
        {blogForm()}
      </div>
      <br />
      {_.orderBy(blogs,['likes'],['desc']).map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>
      )}
    </div>
  )
}

export default App