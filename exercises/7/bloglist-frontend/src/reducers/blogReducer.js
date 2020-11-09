import blogService from '../services/blogs'
import _ from 'lodash'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'UPDATE_BLOG': {
    const id = action.data.id
    return state.map(b => b.id !== id ? b : action.data)
  }
  case 'REMOVE_BLOG': {
    const id = action.data.id
    return _.filter(state,(b) => b.id!==id)
  }
  default:
    return state
  }

}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.comment(id, comment)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id,
      _.chain(blog).update('likes', o => o + 1).update('user', o => o.id).value())
    dispatch({
      type: 'UPDATE_BLOG',
      data: likedBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default reducer