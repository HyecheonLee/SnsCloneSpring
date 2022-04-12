import React, { useEffect } from "react";
import useSWR from 'swr'
import { fetchChatRoom } from '../../apis/chatApi'
import Loading from '../Loading'
import SendMessage from './chat/SendMessage'
import ChatHeader from './chat/ChatHeader'
import ChatMessages from './chat/ChatMessages'
import { useRouter } from 'next/router'
import { useAppDispatch } from '../../store'
import { chatActions } from '../../store/chat'

interface IProps {
  id: string
}

const ChatContainer: React.FC<IProps> = ({...props}) => {
    const {id} = props
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {data, error} = useSWR(`/room/${id}`, () => {
      return fetchChatRoom(id)
    });
    useEffect(() => {
      dispatch(chatActions.updateState(id))
    }, []);

    if (error) {
      router.push("/messages");
      return <></>;
    }
    if (!data) {
      return <Loading/>
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
