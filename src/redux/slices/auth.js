import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (paranms) => {
  const { data } = await axios.post('/auth/login', paranms)
  return data
})

const initialState = {
  data: null,
  status: 'loading',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.data = null
    }
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.data = null
      state.status = 'loading'
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = 'loaded'
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null
      state.status = 'error'
    },
  },
})

export const selectIsAuth = (state) => !!state.auth.data

export const { logout } = authSlice.actions
const authReducer = authSlice.reducer

export default authReducer
