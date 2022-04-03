import Link from "next/link";
import React from "react";
import useSWR from 'swr'
import { fetchChatRooms } from '../../apis/chatApi'
import Loading from '../Loading'
import ChatRoomList from './room/ChatRoomList'

interface IProps {
}

const MessageContainer: React.FC<IProps> = ({...props}) => {
  const {data} = useSWR("rooms", () => {
    return fetchChatRooms()
  })
  if (!data) {
    return <Loading/>
  }
  return (<>
    <div className="position-absolute" style={{top: "15px", right: "20px"}}>
      <Link href="/messages/new"><a><i className="fas fa-plus-square fa-2x"/></a></Link>
    </div>
    <ChatRoomList chatRooms={data}/>
  </>);
};

export default MessageContainer;
