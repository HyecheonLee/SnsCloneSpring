import React, { useEffect } from "react";
import ChatRoomItem from './ChatRoomItem'
import { useAppDispatch, useSelector } from '../../../store'
import { fetchChatRooms } from '../../../apis/chatApi'
import { chatActions } from '../../../store/chat'

interface IProps {
}

const ChatRoomList: React.FC<IProps> = ({...props}) => {

  const dispatch = useAppDispatch()
  const chat = useSelector(state => state.chat)

  useEffect(() => {
    fetchChatRooms().then(value => {
      dispatch(chatActions.fetchChats(value))
    });
  }, []);

  return (<div className="list-group">
    {chat.chatStatusList.map(chatStatus => {
      return <ChatRoomItem key={`chat_room_${chatStatus.id}`}
                           chatStatus={chatStatus}/>
    })}
  </div>);
};

export default ChatRoomList;
