import React, { useState } from "react";
import Link from 'next/link'
import { useForm } from "react-hook-form";
import { apiV1User } from '../../apiUtils'
import { useRouter } from 'next/router'
import LoadingModal from '../LoadingModal'

interface IProps {
}

type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string
};
const RegisterForm: React.FC<IProps> = ({...props}) => {
  const router = useRouter()
  const {register, handleSubmit, watch, formState: {errors}} = useForm<FormData>();
  const [showLoading, setShowLoading] = useState(false);
  const onSubmit = (data: FormData) => {
    setShowLoading(true);
    apiV1User.post("/users/join", data)
      .then(async value => {
        await router.push("/users/login");
        setShowLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (<div style={{maxWidth: "500px", width: "80%"}}
               className="shadow-lg rounded-2 p-4 bg-white">
      <h2 className="fs-2 text-center my-3">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text"
               style={{background: "#f2f2f2"}}
               {...register("firstName")}
               className="form-control my-3"
               placeholder="First Name" required/>
        <input type="text"
               style={{background: "#f2f2f2"}}
               {...register("lastName")}
               className="form-control my-3"
               placeholder="Last Name" required/>
        <input type="text"
               style={{background: "#f2f2f2"}}
               {...register("username")}
               className="form-control my-3"
               placeholder="Username" required/>
        <input type="email"
               style={{background: "#f2f2f2"}}
               {...register('email', {
                 required: 'Email is required',
                 pattern: {
                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                   message: "invalid email address"
                 }
               })}
               className="form-control my-3"
               placeholder="email"
               required/>
        <input type="password" className="form-control my-3"
               style={{background: "#f2f2f2"}}
               {...register("password")}
               placeholder="Password"
               required/>
        <input type="password" className="form-control my-3"
               style={{background: "#f2f2f2"}}
               {...register("confirmPassword")}
               placeholder="Confirm Password"
               required/>
        <input type="submit" className="btn btn-primary w-100 text-white"
               value="Register"/>
      </form>
      <Link href="/user/login">
        <a className="text-center w-100 btn btn-link my-0"> Already have an account? Login
          here</a>
      </Link>
      <LoadingModal show={showLoading}/>
    </div>
  );
}

export default RegisterForm;
