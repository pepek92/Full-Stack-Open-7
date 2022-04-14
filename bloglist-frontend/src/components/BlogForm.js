import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>

      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control id="title" value={title} onChange={handleTitle} />
          <Form.Label>Author:</Form.Label>
          <Form.Control id="author" value={author} onChange={handleAuthor} />
          <Form.Label>Url:</Form.Label>
          <Form.Control id="url" value={url} onChange={handleUrl} />
          <Button variant="primary" id="create" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
