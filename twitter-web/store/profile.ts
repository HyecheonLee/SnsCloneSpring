import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostType } from '../types/post'
import { FollowInfoType, FollowStatusType, UserType } from '../types/user'
import post from './post'

interface ProfileReduxState {
  user?: UserType,
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
    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload
      state.posts = []
      state.hasNextPost = false
      state.replies = []
      state.hasNextReply = false
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
    setFollowStatus(state, action: PayloadAction<FollowInfoType>) {
      if (state.user && state.user.followInfo && state.user.id === action.payload.userId) {
        state.user.followInfo.followStatus = action.payload.followStatus
      }
    },
    setIsFollow(state, action: PayloadAction<boolean>) {
      if (state.user && state.user.followInfo) {
        state.user.followInfo.isFollowing = action.payload
      }
    },
    updatedPost(state, action: PayloadAction<PostType>) {
      const updatedPost = action.payload
      state.posts = state.posts.map(post => {
        if (post.id === updatedPost.id) return updatedPost
        return post
      });

      state.replies = state.replies.map(post => {
        if (post.id === updatedPost.id) return updatedPost
        return post
      });
    },
    clear(state) {
      state.user = undefined
      state = initialState
    }
  }
})
export const profileActions = {...profile.actions};
export default profile
