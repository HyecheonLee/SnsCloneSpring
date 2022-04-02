import React from "react";
import ChatItem from './ChatItem'
import { ChatRoomType } from '../../types/chat'

interface IProps {
  chatRooms: ChatRoomType[]
}

const ChatList: React.FC<IProps> = ({...props}) => {
  const {chatRooms} = props
  return (<div className="list-group">
    {chatRooms.map(chatRoom => {
      return <ChatItem key={`chat_room_${chatRoom.id}`} chatRoom={chatRoom}/>
    })}
  </div>);
};

export default ChatList;
