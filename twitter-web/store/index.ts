import { combineReducers } from 'redux'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector as useReduxSelector, } from 'react-redux'
import auth from "./auth";
import modal from './modal'

declare module 'react-redux' {
  interface DefaultRootState extends RootState {
  }
}

const rootReducer = combineReducers({
  auth: auth.reducer,
  modal: modal.reducer
})

const reducer = (state: any, action: { type: string, payload: any }) => {
  if (action.type === HYDRATE) {
    let payload = action.payload
    const nextState = {
      ...state,
      payload
    };
    if (state.count) nextState.count = state.count
    return nextState;
  }
  return rootReducer(state, action);
}

export type RootState = ReturnType<typeof rootReducer>

const initStore = () => {
  return configureStore({
    reducer,
    devTools: true
  })
}

export const wrapper = createWrapper(initStore)

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
