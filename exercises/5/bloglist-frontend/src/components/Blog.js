import React, { useState } from 'react'
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }
  if (showDetails) {
    return (
      <div style={blogStyle}>
        {blog.title}
        <button onClick={toggleDetails}>hide</button>
        <br/>
        {blog.url}
        <br/>
        {blog.likes}
        <br/>
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
