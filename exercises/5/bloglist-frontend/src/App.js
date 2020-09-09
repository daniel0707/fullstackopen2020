import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const emptyNewBlog = { title: '', author: '', url: '' }
  const emptyNotification = { success: null, message: null }
  const [newBlog, setNewBlog] = useState(emptyNewBlog)
  const [notification, setNotification] = useState(emptyNotification)

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
  const handleBlogChange = (event) => {
    const value = event.target.value;
    setNewBlog({
      ...newBlog,
      [event.target.name]: value
    });
  }
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog(emptyNewBlog)
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
    <form onSubmit={addBlog}>
      <div>
        <label>title:
      <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
            required
          />
        </label>
      </div>
      <div>
        <label>author:
      <input
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
            required
          />
        </label>
        <div>
        </div>

        <label>url:
      <input
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleBlogChange}
            required
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App