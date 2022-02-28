import React from "react";
import LoginLayout from '../../components/layout/LoginLayout'
import LoginForm from '../../components/form/LoginForm'

interface IProps {
}

const login: React.FC<IProps> = ({...props}) => {
  return (<LoginLayout>
    <LoginForm/>
  </LoginLayout>);
};

export default login;
