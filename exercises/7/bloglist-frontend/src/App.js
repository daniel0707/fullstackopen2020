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
import { Switch, Route, useRouteMatch, Link as ReactLink } from 'react-router-dom'
import UserList from './components/UserList'
import { Box, Flex, Input,Heading, Text, Button, Link, FormControl, FormLabel } from '@chakra-ui/core'


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
    return (
      <Flex
        w="100%"
        px={5}
        py={4}
        justifyContent="space-between"
        alignItems="center"
        bg="teal.300"
      >
        <Box>
          <Link as={ReactLink} to='/' px={2} color="blue.800"> home </Link>
          <Link as={ReactLink} to='/blogs' px={2} color="blue.800"> blogs </Link>
          <Link as={ReactLink} to='/users' px={2} color="blue.800"> users </Link>
        </Box>
        <Flex alignItems="center">
          <Text>{user.name} logged in</Text>
          <Button onClick={handleLogOut}>log out</Button>
        </Flex>
      </Flex>
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
    /*     <form onSubmit={handleLogin} id='login-form'>
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
    </form> */
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleLogin} id='login-form'>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" placeholder="username" onChange={({ target }) => setUsername(target.value)}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" onChange={({ target }) => setPassword(target.value)}/>
            </FormControl>
            <Button type="submit" variantColor="teal" variant="outline" width="full" mt={4}>
            Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
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
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Menu/>
      <Notification/>
      <Heading>Blog App</Heading>
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