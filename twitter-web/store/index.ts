import { Action, combineReducers } from 'redux'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'
import auth from "./auth";
import modal from './modal'
import reply from './reply'
import post from './post'
import { store } from 'next/dist/build/output/store'
import profile from './profile'
import chat from './chat';
import notify from './notify';

declare module 'react-redux' {
  interface DefaultRootState extends RootState {
  }
}


const rootReducer = combineReducers({
  auth: auth.reducer,
  modal: modal.reducer,
  reply: reply.reducer,
  post: post.reducer,
  profile: profile.reducer,
  chat: chat.reducer,
  notify: notify.reducer
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

const initStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools: true
  })
}

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;


export const wrapper = createWrapper(initStore)

