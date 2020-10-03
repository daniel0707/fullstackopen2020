import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('BlogForm calls event handler with the right details', () => {
  const mockHandler = jest.fn()

  const component = render(
    <BlogForm createBlog={mockHandler} />
  )

  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')
  const inputTitle = component.container.querySelector('#title')
  const form = component.container.querySelector('form')

  fireEvent.change(inputAuthor, {
    target: {
      value: 'Test Author'
    }
  })
  fireEvent.change(inputUrl, {
    target: {
      value: 'Test Url'
    }
  })
  fireEvent.change(inputTitle, {
    target: {
      value: 'Test Title'
    }
  })

  fireEvent.submit(form)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toMatchObject({ title: 'Test Title', author: 'Test Author', url: 'Test Url' })
})