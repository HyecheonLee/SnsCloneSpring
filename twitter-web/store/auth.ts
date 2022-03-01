import { UserType } from '../types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthReduxState {
  user: UserType | null,
  login: boolean
}

const initialState: AuthReduxState = {
  user: null,
  login: false
}
const auth = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserType>) {
      state.user = action.payload
      state.login = true
    },
    logout(state) {
      state.login = true
      state.user = null
    }
  }
})
export const authActions = {...auth.actions};
export default auth
