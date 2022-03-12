import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ModalType = "loading" | "deletePost" | ""

interface ModalReduxState {
  type: ModalType,
  message?: string,
  isShow: boolean,
  postId?: number,
}

const initialState: ModalReduxState = {
  type: "",
  isShow: false,
  message: ""
}
const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<{ type: ModalType, message?: string, postId: number }>) {
      state.message = action.payload.message
      state.isShow = true
      state.type = action.payload.type
      state.postId = action.payload.postId
    },
    showLoading(state, action: PayloadAction<string | undefined>) {
      state.message = action.payload
      state.isShow = true
      state.type = "loading"
    },
    removeModal(state) {
      state.message = ""
      state.isShow = false
      state.type = ""
    }
  }
})
export const modalActions = {...modal.actions};
export default modal
