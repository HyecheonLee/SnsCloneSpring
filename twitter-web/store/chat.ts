import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChatStatusType } from '../types/chat'

interface ChatReduxState {
  chatStatusList: ChatStatusType[],
}

const initialState: ChatReduxState = {
  chatStatusList: [],
}
const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    fetchChats: (state, action: PayloadAction<ChatStatusType[]>) => {
      state.chatStatusList = action.payload
    },
    fetchChat: (state, action) => {
      const payload = action.payload
      state.chatStatusList = state.chatStatusList.map(value => {
        if (value.id !== payload.id) return value
        return payload
      });
    }
  }
})
export const chatActions = {...chat.actions};
export default chat
