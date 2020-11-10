import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Heading, List, ListItem } from '@chakra-ui/core'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  return (
    <>
      <Heading as='h3'>blogs</Heading>
      <List styleType='disc'>
        {_.orderBy(blogs, ['likes'], ['desc'])
          .map(blog => (
            <ListItem key={blog.id}>
              <Link to={`/blogs/${blog.id}`}
                flex='1'
                py={2}
                px={4}
                rounded='md'
                bg='gray.100'
                _hover={{ borderColor: 'gray.200', bg: 'gray.200' }}
                _focus={{
                  outline: 'none',
                  bg: 'white',
                  boxShadow: 'outline',
                  borderColor: 'gray.300',
                }}>
                {blog.title}, {blog.author}</Link>
            </ListItem>
          ))
        }
      </List>
    </>
  )}

export default BlogList