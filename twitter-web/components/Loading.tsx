import React from "react";
import { Bars } from 'react-loading-icons'

interface IProps {
  message?: string
  height?: number,
  width?: number,
  fontSize?: number
}

const Loading: React.FC<IProps> = ({...props}) => {
  const {fontSize, width, message, height} = props
  return (<div className={"text-center"}>
    <Bars fill={"#06bcee"} height={height} width={width}/>
    <div
      style={{
        fontSize: fontSize || 50,
        color: "#06bcee"
      }}>{props.message || "Loading..."}</div>
  </div>);
};

export default Loading;
