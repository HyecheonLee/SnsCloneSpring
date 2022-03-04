import React, { useEffect } from "react";
import { useSelector } from '../store'
import { useDispatch } from 'react-redux'
import { authActions } from '../store/auth'
import { apiV1User } from '../utils/apiUtils'
import { UserType } from '../types/user'
import { ApiResponseType, ErrorType } from '../types/api'
import { useRouter } from 'next/router'
import { modalActions } from '../store/modal'

interface IProps {
}

const Auth: React.FC<IProps> = ({...props}) => {
  let auth = useSelector(state => state.auth)
  let dispatch = useDispatch()
  let {showLoading, removeModal} = modalActions
  let router = useRouter()

  const login = async () => {
    const {login} = authActions
    await dispatch(showLoading(""));
    await apiV1User.get<ApiResponseType<UserType> | ErrorType>("/me")
      .then(async resp => {
        if (resp.status == 200) {
          const response = resp.data as ApiResponseType<UserType>
          await dispatch(removeModal());
          await dispatch(login(response.data))
          return;
        }
        await dispatch(removeModal());
        await router.push("/user/login");
      });
  }

  useEffect(() => {
    if (!auth.login || auth.user) {
      login()
    }
    return () => {
      dispatch(removeModal());
    }
  }, [])
  if (!auth.login) return null
  if (!auth.login && auth.user) return null

  return (<>
    {props.children}
  </>);
};

export default Auth;
