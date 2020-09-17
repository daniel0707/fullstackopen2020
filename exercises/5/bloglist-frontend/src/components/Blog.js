import React, { useState } from 'react'
import blogService from './../services/blogs'
import _ from 'lodash'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, blogs, setBlogs }) => {
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

export default Blog
