import React from "react";
import useSWR from 'swr'
import { fetchChatRoom } from '../../apis/chatApi'
import Loading from '../Loading'
import SendMessage from './chat/SendMessage'
import ChatHeader from './chat/ChatHeader'
import ChatMessages from './chat/ChatMessages'
import { useRouter } from 'next/router'

interface IProps {
  id: string
}

const SHOW_SIZE = 2
const ChatContainer: React.FC<IProps> = ({...props}) => {
    const {id} = props
    const router = useRouter()

    const {data, error} = useSWR(`/room/${id}`, () => {
      return fetchChatRoom(id)
    });

    if (error) {
      router.push("/messages");
      return <></>;
    }
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
        <ChatMessages chatRoom={data}/>
        <SendMessage chatRoomId={id}/>
      </div>);
  }
;

export default ChatContainer;
