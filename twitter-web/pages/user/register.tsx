import React from "react";
import LoginLayout from '../../components/layout/LoginLayout'
import RegisterForm from '../../components/form/RegisterForm'

interface IProps {
}

const register: React.FC<IProps> = ({...props}) => {
  return (<LoginLayout>
    <RegisterForm/>
  </LoginLayout>);
};

export default register;
