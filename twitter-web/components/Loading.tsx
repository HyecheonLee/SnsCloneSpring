import React from "react";
import { Bars } from 'react-loading-icons'

interface IProps {
  message?: string
}

const Loading: React.FC<IProps> = ({...props}) => {
  return (<div className={"text-center"}>
    <Bars fill={"#06bcee"}/>
    <div className="display-2"
         style={{color: "#06bcee"}}>{props.message || "Loading..."}</div>
  </div>);
};

export default Loading;
