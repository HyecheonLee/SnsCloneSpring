import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChatStatusType } from '../types/chat'

interface ChatReduxState {
  unCheckedCnt: number,
  chatStatusList: ChatStatusType[],
}

const initialState: ChatReduxState = {
  unCheckedCnt: 0,
  chatStatusList: [],
}
const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    fetchChats: (state, action: PayloadAction<ChatStatusType[]>) => {
      state.chatStatusList = action.payload
      state.unCheckedCnt = action.payload.reduce((acc, value) => acc + value.unCheckCnt, 0)
    },
    fetchChat: (state, action: PayloadAction<ChatStatusType>) => {
      const payload = action.payload
      const newResult = state.chatStatusList.map(value => {
        if (value.id !== payload.id) return value
        return payload
      })
      state.chatStatusList = newResult;
      state.unCheckedCnt = newResult.reduce((acc, value) => acc + value.unCheckCnt, 0)
    },
    updateState: (state, action: PayloadAction<number | string>) => {
      state.unCheckedCnt = state.chatStatusList.map(value => {
        if (value.id != action.payload) return value
        return {
          ...value,
          unCheckCnt: 0
        }
      }).reduce((acc, value) => acc + value.unCheckCnt, 0)
    }
  }
})
export const chatActions = {...chat.actions};
export default chat
