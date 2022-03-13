import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostType } from '../types/post'

interface ProfileReduxState {
  username?: string,
  posts: PostType[],
  hasNextPost: boolean,
  replies: PostType[],
  hasNextReply: boolean,
}

const initialState: ProfileReduxState = {
  posts: [],
  hasNextPost: false,
  replies: [],
  hasNextReply: false
}
const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
    fetchPost(state, action: PayloadAction<PostType[]>) {
      const newPosts = [...action.payload, ...state.posts]
      state.hasNextPost = action.payload.length >= 10;
      state.posts = newPosts.sort((a, b) => b.id - a.id)
    },
    fetchReply(state, action: PayloadAction<PostType[]>) {
      const newPosts = [...action.payload, ...state.replies]
      state.hasNextReply = action.payload.length >= 10;
      state.replies = newPosts.sort((a, b) => b.id - a.id)
    },
    clear(state) {
      state.username = undefined
      state = initialState
    }
  }
})
export const profileActions = {...profile.actions};
export default profile
