import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 0,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogs = useSelector(state => state.blogs)
  return (
    <>
      <h2>blogs</h2>
      <ul style={{ 'listStyleType': 'none' , 'padding':'0' }}>
        {_.orderBy(blogs, ['likes'], ['desc'])
          .map(blog => (
            <li style={blogStyle} key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}, {blog.author}</Link></li>
          ))
        }
      </ul>
    </>
  )}

export default BlogList