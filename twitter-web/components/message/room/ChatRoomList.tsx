import React from "react";
import ChatRoomItem from './ChatRoomItem'
import { ChatRoomType } from '../../../types/chat'

interface IProps {
  chatRooms: ChatRoomType[]
}

const ChatRoomList: React.FC<IProps> = ({...props}) => {
  const {chatRooms} = props
  return (<div className="list-group">
    {chatRooms.map(chatRoom => {
      return <ChatRoomItem key={`chat_room_${chatRoom.id}`} chatRoom={chatRoom}/>
    })}
  </div>);
};

export default ChatRoomList;
