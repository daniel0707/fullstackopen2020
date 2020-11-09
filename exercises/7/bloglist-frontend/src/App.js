import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import User from './components/User'
import { createNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser } from './reducers/loginReducer'
import { initUsers } from './reducers/userReducer'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import UserList from './components/UserList'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(loginUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [dispatch])

  const Menu = () => {
    const style = {
      background: 'gray',
      padding: '5'
    }
    return (
      <div style={style}>
        <Link to='/'> home </Link>
        <Link to='/blogs'> blogs </Link>
        <Link to='/users'> users </Link>
        <>
          {user.name} logged in
          <button onClick={handleLogOut}>log out</button>
        </>
      </div>
    )
  }

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
    dispatch(createBlog(blogObject))
    dispatch(createNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`,true))
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

  const userMatch = useRouteMatch('/users/:id')
  const matchedUser = userMatch ? users.find(u => u.id === userMatch.params.id) : null
  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null

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
      <Menu/>
      <Notification/>
      <h2>Blog App</h2>
      <Switch>
        <Route path="/users/:id">
          <User user={matchedUser}/>
        </Route>
        <Route path="/users">
          <UserList/>
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={matchedBlog}/>
        </Route>
        <Route path="/blogs">
          <BlogList/>
        </Route>
        <Route path="/">
          <div>
            {blogForm()}
          </div>
          <BlogList/>
        </Route>
      </Switch>
    </div>
  )
}

export default App