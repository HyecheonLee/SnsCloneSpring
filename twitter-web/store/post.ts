import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostStatusType, PostType } from '../types/post'

interface PostReduxState {
  posts: PostType[],
  hasNext: boolean,
  currentPost?: PostType,
  replies: PostType[],
  hasNextReplies: boolean,
}

const initialState: PostReduxState = {
  posts: [],
  hasNext: false,
  currentPost: undefined,
  replies: [],
  hasNextReplies: false
}
const post = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePost(state: PostReduxState, action: PayloadAction<PostType>) {
      const updatePost = action.payload
      state.posts = state.posts.map(post => {
        if (post.id === updatePost.id) {
          return updatePost;
        }
        return post
      });
    },
    newPost(state: PostReduxState, action: PayloadAction<PostType>) {
      const newPosts = [action.payload, ...state.posts]
      const post = action.payload
      state.posts = newPosts.sort((a, b) => b.id - a.id)
      if (state.currentPost?.id == post.id) {
        const newReplies = [post, ...state.replies]
        state.replies = newReplies.sort((a, b) => b.id - a.id)
      }
    },
    fetchPosts(state: PostReduxState, action: PayloadAction<PostType[]>) {
      const newPosts = [...action.payload, ...state.posts]
      state.hasNext = action.payload.length >= 10;
      state.posts = newPosts.sort((a, b) => b.id - a.id)
    },
    deletePost(state: PostReduxState, action: PayloadAction<number>) {
      state.posts = state.posts.filter(value => value.id !== action.payload)
      const postId = action.payload
      if (state.currentPost?.id == postId) {
        state.replies = state.replies.filter(value => value.id !== action.payload)
      }
    },
    updateStatus(state, action: PayloadAction<{ postId: number, status: PostStatusType }>) {
      const {postId, status} = action.payload
      state.posts = state.posts.map(post => {
        if (post.id === postId) {
          const newPost: PostType = {
            ...post,
            postStatus: {
              ...status
            }
          }
          return newPost
        }
        return post
      });
      state.replies = state.replies.map(post => {
        if (post.id === postId) {
          const newPost: PostType = {
            ...post,
            postStatus: {
              ...status
            }
          }
          return newPost
        }
        return post
      });
    },
    setCurrentPost(state: PostReduxState, action: PayloadAction<PostType>) {
      state.currentPost = action.payload
    },
    fetchReplies: (state, action: PayloadAction<PostType[]>) => {
      const newPosts = [...action.payload, ...state.replies]
      state.hasNextReplies = action.payload.length >= 10;
      state.replies = newPosts.sort((a, b) => b.id - a.id)
    },
    clearReply: (state) => {
      state.replies = [];
      state.hasNextReplies = false;
    },
  }
});
export const postActions = {...post.actions};
export default post
