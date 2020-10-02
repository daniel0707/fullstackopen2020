import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

const user = {
  username: 'Test User'
}

const blog = {
  author:'Michael Chan',
  likes: 20,
  title:'React patterns',
  url: 'https://reactpatterns.com/',
  user: user
}


test('renders content', () => {
  const component = render(
    <Blog blog={blog}/>
  )
  //author should render
  expect(component.container).toHaveTextContent('Michael Chan')
  //title should render
  expect(component.container).toHaveTextContent('React patterns')
  //url & likes should NOT render without toggling button
  expect(component.container).not.toHaveTextContent('20')
  expect(component.container).not.toHaveTextContent('https://reactpatterns.com/')
})

test('details show after button click', () => {
  const component = render(
    <Blog blog={blog} user={user}/>
  )
  const button = component.container.querySelector('.toggleButton')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('20')
  expect(component.container).toHaveTextContent('https://reactpatterns.com/')
})