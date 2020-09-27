import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const emptyNewBlog = { title: '', author: '', url: '' }
  const [newBlog, setNewBlog] = useState(emptyNewBlog)

  const handleBlogChange = (event) => {
    const value = event.target.value
    setNewBlog({
      ...newBlog,
      [event.target.name]: value
    })
  }

  const addBlog = (event) => {
    event.preventDevault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog(emptyNewBlog)
  }

  return (
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
}
BlogForm.propTypes = {
  createBlog : PropTypes.func.isRequired
}
export default BlogForm