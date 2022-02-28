import React from "react";

interface IProps {
}

const LoginLayout: React.FC<IProps> = ({...props}) => {
  return (<div
    className="bg-primary min-vh-100  min-vw-100 d-flex justify-content-center align-items-start py-5">
    {props.children}
  </div>);
};

export default LoginLayout;
