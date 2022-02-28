import Link from "next/link";
import React, { FunctionComponent, useState } from "react";
import { useForm } from 'react-hook-form'
import { apiV1, apiV1User } from '../../apiUtils'
import { useRouter } from 'next/router'
import LoadingModal from '../LoadingModal'

interface IProps {

}

type FormData = {
  username: string;
  password: string;
};

const LoginForm: React.FC<IProps> = ({...props}) => {
  const {register, handleSubmit, watch, formState: {errors}} = useForm<FormData>();
  let router = useRouter()
  const [showLoading, setShowLoading] = useState(false);

  const onSubmit = (data: FormData) => {
    setShowLoading(true);
    apiV1User.post("/users/login", data)
      .then(async value => {
        await router.push("/");
        setShowLoading(false);
      })
      .catch(error => {
        console.log(error);
        setShowLoading(false);
      });
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
      <LoadingModal show={showLoading}/>
    </div>);
};

export default LoginForm;
