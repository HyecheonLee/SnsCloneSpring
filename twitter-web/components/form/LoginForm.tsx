import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from 'react-hook-form'
import { apiV1User } from '../../apiUtils'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { modalActions } from '../../store/modal'

interface IProps {

}

type FormData = {
  username: string;
  password: string;
};

const LoginForm: React.FC<IProps> = ({...props}) => {
  const {register, handleSubmit, watch, formState: {errors}} = useForm<FormData>();
  const router = useRouter()
  const dispatch = useDispatch()
  const {showLoading, removeModal} = modalActions
  useEffect(() => {
    return () => {
      dispatch(removeModal())
    }
  });
  const onSubmit = (data: FormData) => {
    dispatch(showLoading("로그인중입니다."))
    apiV1User.post("/login", data)
      .then(async value => {
        await dispatch(removeModal());
        if (value.ok) {
          await router.push("/");
        }
      })
  }

  return (
    <div style={{maxWidth: "500px", width: "80%"}}
         className="shadow-lg rounded-2 p-2 bg-white">
      <h2 className="fs-2 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text"
               style={{background: "#f2f2f2"}}
               {...register("username")}
               name="username" className="form-control my-3"
               placeholder="Username or email" required/>
        <input type="password" className="form-control my-3"
               style={{background: "#f2f2f2"}}
               {...register("password")}
               name="password"
               placeholder="Password"
               required/>
        <input type="submit" className="btn btn-primary w-100 text-white"
               value="Login"/>
      </form>
      <Link href="/user/register">
        <a className="text-center w-100 btn btn-link my-0"> Need an account? Register
          here.</a>
      </Link>
    </div>);
};

export default LoginForm;
