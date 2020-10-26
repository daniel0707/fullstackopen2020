import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { createNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser } from './reducers/loginReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(loginUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [dispatch])



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
      dispatch(loginUser(user))
      setUsername('')
      setPassword('')
      dispatch(createNotification(`Welcome ${user.name}!`,true))
    } catch (exception) {
      dispatch(createNotification('Wrong credentials',false))
    }
  }

  const handleLogOut = () => {
    dispatch(createNotification(`Logged out ${user.name}`, true))
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(logoutUser())
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        dispatch(createNotification(
          `A new blog ${blogObject.title} by ${blogObject.author} added`,
          true
        ))
      })
  }
  const loginForm = () => (
    <form onSubmit={handleLogin} id='login-form'>
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
      <button type="submit" id='login-button'>login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user===null) {
    return (
      <div>
        <Notification/>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification/>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={handleLogOut}>log out</button>
      </div>
      <h3>create new</h3>
      <div>
        {blogForm()}
      </div>
      <BlogList user={user}/>
    </div>
  )
}

export default App