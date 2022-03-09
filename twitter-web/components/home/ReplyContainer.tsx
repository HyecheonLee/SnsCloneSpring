import React from "react";
import { ReplyType } from '../../types/reply'
import { dayjs } from '../../utils/DayjsUtils'
import Reply from "./Reply";

interface IProps {
  replies: ReplyType[]
}

const ReplyContainer: React.FC<IProps> = ({...props}) => {
  const {replies} = props;

  return (<div className="pb-3" style={{maxHeight: "300px", overflowY: "auto"}}>
    {replies.map(reply => {
      return <Reply key={`reply_${reply.id}`} reply={reply}/>
    })}
  </div>);
};

export default ReplyContainer;
