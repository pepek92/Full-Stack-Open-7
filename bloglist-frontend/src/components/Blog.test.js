import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

let blogs

const user = {
  user: 'Pepe K',
  username: 'pepek',
}

const blog = {
  title: 'testi blogi',
  user: user,
  author: 'Pepe K',
  url: 'iltasanomat.fi',
  likes: 10,
}

test('title and author', () => {
  const component = render(
    <Blog blog={blog} blogs={blogs} user={user} setBlogs={() => {}} />
  )

  const li = component.container.querySelector('blog')
  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(`${blog.title}, ${blog.author}`)
  expect(component.container).not.toHaveTextContent(`${blog.url}`)
  expect(component.container).not.toHaveTextContent(`${blog.likes}`)
})

test('show url and likes when button pushed', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      blogs={blogs}
      user={user}
      setBlogs={() => {}}
      handleInfoButton={mockHandler}
    />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const li = component.container.querySelector('blog')
  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(`${blog.title}, ${blog.author}`)
  expect(component.container).toHaveTextContent(`${blog.url}`)
  expect(component.container).toHaveTextContent(`${blog.likes}`)
})

test('like-button pushed twice', async () => {
  const BtnHandler = jest.fn()
  const likeBtnHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      blogs={blogs}
      user={user}
      setBlogs={() => {}}
      handleLikeButton={likeBtnHandler(blog)}
      handleInfoButton={BtnHandler}
    />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likebutton = component.getByText('like')
  fireEvent.click(likebutton)
  fireEvent.click(likebutton)

  expect(likeBtnHandler.mock.calls.length).toBe(2)
})
