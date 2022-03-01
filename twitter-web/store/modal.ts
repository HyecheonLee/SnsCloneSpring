import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalReduxState {
  type: "loading" | "",
  message: string,
  isShow: boolean,
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
    showLoading(state, action: PayloadAction<string>) {
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
