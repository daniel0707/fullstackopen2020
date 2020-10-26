import React from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  return _.orderBy(blogs, ['likes'], ['desc'])
    .map(blog =>
      <Blog
        key={blog.id}
        blog={blog}/>
    )
}

export default BlogList