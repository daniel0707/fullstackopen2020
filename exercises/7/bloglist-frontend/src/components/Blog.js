import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const user = useSelector(state => state.login)
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()
  const removeBlogConfirm = (blog) => () => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}"?`))
    { dispatch(removeBlog(blog)) }
  }
  const addComment = () => {
    dispatch(commentBlog(blog.id,{ comment: newComment }))
    setNewComment('')
  }
  if (!blog) return null
  return (
    <div className='blog'>
      <h2 className='blog-title'>{blog.title}</h2>
      <span className='blog-url'>{blog.url}</span>
      <br />
      <span className='blog-likes'>{blog.likes}</span>
      <button onClick={() => dispatch(likeBlog(blog))} className="likeButton">like</button>
      <br />
      <span className='blog-author'>{blog.author}</span>
      <br />
      {
        user.username === blog.user.username &&
          <button onClick={removeBlogConfirm(blog)}>remove</button>
      }
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((v, i) => (
          <li key={i}>
            {v}
          </li>
        ))}
      </ul>
    </div>
  )

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
