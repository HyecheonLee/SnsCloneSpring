import Link from "next/link";
import React from "react";

interface IProps {
}

const MessageContainer: React.FC<IProps> = ({...props}) => {
  return (<>
    <div className="position-absolute" style={{top: "15px", right: "20px"}}>
      <Link href="/messages/new"><a><i className="fas fa-plus-square fa-2x"/></a></Link>
    </div>
  </>);
};

export default MessageContainer;
