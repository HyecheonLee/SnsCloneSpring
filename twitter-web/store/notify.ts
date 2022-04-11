import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotifyType } from '../types/event'

interface NotifyReduxState {
  count: number,
  notifies: NotifyType[],
  hasNext: boolean,
}

const initialState: NotifyReduxState = {
  count: 0,
  notifies: [],
  hasNext: false,
}
const notify = createSlice({
  name: "notify",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<NotifyType[]>) => {
      state.hasNext = action.payload.length >= 10
      state.notifies = [...action.payload]
    },
    fetch: (state, action: PayloadAction<NotifyType[]>) => {
      state.hasNext = action.payload.length >= 10
      state.notifies = [...state.notifies, ...action.payload]
    },
    eventNotify: (state, action: PayloadAction<NotifyType>) => {
      state.notifies = [action.payload, ...state.notifies]
    },
    updateCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload
    },
    checkNotify: (state, action: PayloadAction<number>) => {
      state.notifies = state.notifies.map(notify => {
        if (notify.id !== action.payload) {
          return notify;
        } else {
          notify.checked = true
          return notify;
        }
      })
    }
  }
})
export const notifyActions = {...notify.actions};
export default notify
