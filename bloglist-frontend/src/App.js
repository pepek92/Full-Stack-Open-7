import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { newNotification } from './reducers/notificationReducer'
import { initializeBlogs, appendBlog } from './reducers/blogReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import { Nav, Navbar } from 'react-bootstrap'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Menu = () => {
    const padding = {
      padding: 5,
    }

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">
                  Blogs
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">
                  Users
                </Link>
              </Nav.Link>
              {user.name} logged in{' '}
              <button onClick={handleLogout}>logout</button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br />
        {blogForm()}
        <br />

        <Routes>
          <Route path="/" element={blogsList()} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    )
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((createdBlog) => {
      dispatch(appendBlog(createdBlog))
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(newNotification('wrong username or password', 3000))
      setTimeout(() => {
        dispatch(newNotification(null, 3000))
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleName={({ target }) => setUsername(target.value)}
        handlePasswd={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogsList = () => {
    return (
      <div>
        <h2>Blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} blogs={blogs} user={user} />
        ))}
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }

  return (
    <Router>
      <div className="container">
        {user === null ? (
          <div>
            <h2>Log in to application</h2>
            <Notification />
            {loginForm()}
          </div>
        ) : (
          <div>
            {Menu()}
            <Notification />
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
