import React, { useState } from 'react'
import blogService from './../services/blogs'
import _ from 'lodash'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }
  const likeBlog = async () => {
    await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
    setBlogs(_.map(blogs,i => i.id === blog.id ? _.set(i, 'likes', i.likes + 1) : i))
  }
  const removeBlog = async () => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      await blogService.remove(blog.id)
      setBlogs(_.reject(blogs,i => i.id===blog.id))
    }
  }
  if (showDetails) {
    return (
      <div style={blogStyle}>
        {blog.title}
        <button onClick={toggleDetails}>hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes}
        <button onClick={likeBlog}>like</button>
        <br />
        {blog.author}
        <br />
        {
          user.username === blog.user.username &&
          <button onClick={removeBlog}>remove</button>
        }
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}<button onClick={toggleDetails}>view</button>
      </div>
    )
  }
}
Blog.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string
  }),
  blog: PropTypes.shape({
    author: PropTypes.string,
    id: PropTypes.string,
    likes: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
  }),
  setBlogs: PropTypes.func,
  blogs: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    id: PropTypes.string,
    likes: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
  }))
}
export default Blog
