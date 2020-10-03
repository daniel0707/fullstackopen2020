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
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog(emptyNewBlog)
  }

  return (
    <div className='formDiv'>
      <form onSubmit={addBlog} id='blogForm'>
        <label>title:
          <input
            id='title'
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
            required
          />
        </label>
        <label>author:
          <input
            id='author'
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
            required
          />
        </label>
        <label>url:
          <input
            id='url'
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleBlogChange}
            required
          />
        </label>
        <button type="submit" id="submitButton">create</button>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  createBlog : PropTypes.func.isRequired
}
export default BlogForm