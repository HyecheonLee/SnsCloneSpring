import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ModalType = "loading" | "deletePost" | "confirm" | "photoUpload" | ""

interface ModalReduxState {
  type: ModalType,
  title?: string,
  message?: string,
  isShow: boolean,
  onClick?: Function,
  onClose?: Function,
}

const initialState: ModalReduxState = {
  type: "",
  title: "",
  isShow: false,
  message: ""
}
const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<{
      type: ModalType, title?: string, message?: string,
      onClick?: Function,
      onClose?: Function,
    }>) {
      state.title = action.payload.title
      state.message = action.payload.message
      state.isShow = true
      state.type = action.payload.type
      state.onClick = action.payload.onClick
      state.onClose = action.payload.onClose
    },
    showLoading(state, action: PayloadAction<string | undefined>) {
      state.message = action.payload
      state.isShow = true
      state.type = "loading"
    },
    removeModal(state) {
      state.title = undefined
      state.message = undefined
      state.isShow = false
      state.type = ""
      state.onClick = undefined
      state.onClose = undefined
    }
  }
})
export const modalActions = {...modal.actions};
export default modal
