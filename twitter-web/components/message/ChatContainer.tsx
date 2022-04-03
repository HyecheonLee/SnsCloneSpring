import React, { FunctionComponent } from "react";
import useSWR from 'swr'
import { fetchChatRoom } from '../../apis/chatApi'
import Loading from '../Loading'
import SendMessage from './chat/SendMessage'
import Image from 'next/image'
import { domain } from '../../utils/apiUtils'
import ChatHeader from './chat/ChatHeader'

interface IProps {
  id: string
}

const SHOW_SIZE = 2
const ChatContainer: React.FC<IProps> = ({...props}) => {
  const {id} = props

  const {data, error} = useSWR(`/room/${id}`, () => {
    return fetchChatRoom(id)
  });
  if (!data) {
    return <Loading/>
  }
  let profiles = data.users.map(value => value.profilePic)
  if (profiles.length > SHOW_SIZE) {
    profiles = profiles.slice(0, SHOW_SIZE)
  }
  return (
    <div className="d-flex flex-column overflow-scroll"
         style={{height: "calc(100vh - 4rem)"}}>
      <ChatHeader data={data}/>
      <div className="flex-grow-1 border-bottom p-3 d-flex flex-column overflow-scroll"></div>
      <SendMessage/>
    </div>);
};

export default ChatContainer;
