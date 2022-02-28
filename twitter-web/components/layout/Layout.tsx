import React, { FunctionComponent } from "react";

interface IProps {
}

const Layout: React.FC<IProps> = ({...props}) => {
  return (<div>
    {props.children}
  </div>);
};

export default Layout;
