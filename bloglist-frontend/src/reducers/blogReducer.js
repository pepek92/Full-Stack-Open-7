import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    like(state, action) {
      const id = action.payload
      const blogToChange = state.find((n) => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    remove(state, action) {
      console.log(action.payload)
      return state.filter((b) => b.id !== action.payload.id)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.createNew(content)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(remove(blog))
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const blogToChange = blogs.find((n) => n.id === id)
    await blogService.update({ ...blogToChange, likes: blogToChange.likes + 1 })
    dispatch(like(id))
  }
}

export const { like, appendBlog, setBlogs, remove } = blogSlice.actions

export default blogSlice.reducer
