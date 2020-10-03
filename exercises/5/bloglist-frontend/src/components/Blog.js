import React, { useState } from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, user , likeBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  if (showDetails) {
    return (
      <div style={blogStyle} className='blog'>
        {blog.title}
        <button onClick={toggleDetails}>hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes}
        <button onClick={likeBlog} className="likeButton">like</button>
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
      <div style={blogStyle} className='blog'>
        {blog.title} {blog.author}<button onClick={toggleDetails} className="toggleButton">view</button>
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
