import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const [showInfo, setShowInfo] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    marginTop: 5,
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
  }

  const handleInfoButton = () => {
    setShowInfo(!showInfo)
  }

  const handleRemoveButton = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
  }

  const handleLikeButton = async (blog) => {
    dispatch(likeBlog(blog.id))
  }

  const FullInfo = () => {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title}, {blog.author}{' '}
          <button onClick={() => handleInfoButton()}>hide</button>
          <br />
          {blog.url}
          <br />
          {blog.likes} likes{' '}
          <button id="like" onClick={() => handleLikeButton(blog)}>
            like
          </button>
          <br />
          {blog.user.name}
          <br />
          {user.username === blog.user.username && (
            <button id="remove" onClick={() => handleRemoveButton(blog)}>
              remove
            </button>
          )}
        </p>
      </div>
    )
  }
  const LessInfo = () => {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title}, {blog.author}{' '}
          <button id="view" onClick={() => handleInfoButton()}>
            view
          </button>{' '}
          <br />
        </p>
      </div>
    )
  }
  return <div className="blog">{showInfo ? <FullInfo /> : <LessInfo />}</div>
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
