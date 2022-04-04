import React, { FunctionComponent, useState } from "react";
import EventSourceHook from '../../hooks/EventSourceHook'
import { ChatMessageType } from '../../../types/chat'
import _ from "lodash";

interface IProps {
  chatRoomId: string
}

const ChatMessages: React.FC<IProps> = ({...props}) => {
    const {chatRoomId} = props
    const events = new Map<string, (data: any) => void>();
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    events.set("chatMessage", (data: ChatMessageType) => {
      setMessages(prevState => {
        return _.uniqBy([...prevState, data], "id")
      })
    })
    return (
      <EventSourceHook
        eventUrl={`http://localhost:8080/api/v1/chat/room/${chatRoomId}/message`}
        events={events}>
        <div className="flex-grow-1 border-bottom p-3 d-flex flex-column overflow-scroll">
          {messages.map(value => {
            return <div key={value.id}>{value.message}</div>
          })}
        </div>
      </EventSourceHook>);
  }
;

export default ChatMessages;
