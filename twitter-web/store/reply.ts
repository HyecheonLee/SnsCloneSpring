import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostType } from '../types/post'

interface ReplyReduxState {
  show: boolean,
  post?: PostType,
}

const initialState: ReplyReduxState = {
  show: false,
}
const reply = createSlice({
  name: "reply",
  initialState,
  reducers: {
    showReply(state, action: PayloadAction<PostType>) {
      state.show = true
      state.post = action.payload
    },
    closeReply(state) {
      state.show = false
    }
  }
})
export const replyActions = {...reply.actions};
export default reply
