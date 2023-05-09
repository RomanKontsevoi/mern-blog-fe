import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts')
  return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags')
  return data
})

export const fetchPost = createAsyncThunk('posts/fetchPost', async (id) => {
  const { data } = await axios.get(`/posts/${id}`)
  return data
})

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  post: {
    item: {},
    status: 'loading'
  }
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = []
      state.posts.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload
      state.posts.status = 'loaded'
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = []
      state.posts.status = 'error'
    },
    [fetchTags.pending]: (state) => {
      state.tags.items = []
      state.tags.status = 'loading'
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload
      state.tags.status = 'loaded'
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = []
      state.tags.status = 'error'
    },
    [fetchPost.pending]: (state) => {
      state.post.item = {}
      state.post.status = 'loading'
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.post.item = action.payload
      state.post.status = 'loaded'
    },
    [fetchPost.rejected]: (state) => {
      state.post.item = {}
      state.post.status = 'error'
    },
  },
})

const postsReducer = postSlice.reducer

export default postsReducer
