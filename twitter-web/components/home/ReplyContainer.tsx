import React from "react";
import { ReplyType } from '../../types/reply'
import Reply from "./Reply";

interface IProps {
  replies: ReplyType[]
  deleteReply: (id: number) => void
}

const ReplyContainer: React.FC<IProps> = ({...props}) => {
  const {replies, deleteReply} = props;

  return (<div style={{maxHeight: "300px", overflowY: "auto"}}>
    {replies.map(reply => {
      return <div key={`reply_${reply.id}`}>
        <Reply reply={reply} deleteReply={deleteReply}/>
        <hr/>
      </div>
    })}
  </div>);
};

export default ReplyContainer;
