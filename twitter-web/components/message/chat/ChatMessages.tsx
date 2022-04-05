import React, { useEffect, useState } from "react";
import EventSourceHook from '../../hooks/EventSourceHook'
import { ChatMessageType, ChatRoomType } from '../../../types/chat'
import _ from "lodash";
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchChatMessage } from '../../../apis/chatApi'
import { useSelector } from '../../../store'
import { domain } from '../../../utils/apiUtils'
import Image from 'next/image'


interface IProps {
  chatRoom: ChatRoomType,
  chatRoomId: string
}

const ChatMessages: React.FC<IProps> = ({...props}) => {
  const {chatRoomId, chatRoom} = props
  const events = new Map<string, (data: any) => void>();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const auth = useSelector(state => state.auth);
  const isScroll = (el: HTMLElement | null) => {
    return (el?.scrollHeight || 0) > (el?.clientHeight || 0)
  }
  useEffect(() => {
    messageFetch()
  }, [chatRoomId]);

  useEffect(() => {
    if (hasNext) {
      const scrollable = document.getElementById("scrollableDiv")
      if (!isScroll(scrollable)) {
        messageFetch()
      }
    }
  }, [hasNext, messages.length]);
  const getProfile = (username: string) => {
    const result = _.find(chatRoom.users, value => value.username === username)
    return result?.profilePic
  }
  const messageFetch = async () => {
    let result;
    if (messages.length > 0) {
      result = await fetchChatMessage(chatRoomId, messages[messages.length - 1].id)
    } else {
      result = await fetchChatMessage(chatRoomId)
    }
    setHasNext(result.length >= 10)
    setMessages([...messages, ...result])
  }
  events.set("chatMessage", (data: ChatMessageType) => {
    setMessages(prevState => {
      return _.sortBy(_.uniqBy([...prevState, data], "id"), "id").reverse()
    })
  })

  return (
    <EventSourceHook
      eventUrl={`http://localhost:8080/api/v1/chat/room/${chatRoomId}/message-notify`}
      events={events}>
      <div
        id="scrollableDiv"
        style={{
          height: "100%",
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}>
        <InfiniteScroll
          dataLength={messages.length}
          next={messageFetch}
          style={{
            display: 'flex',
            flexDirection: 'column-reverse'
          }} //To put endMessage and loader to the top.
          inverse={true} //
          hasMore={hasNext}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >

          {messages.filter(value => value.message.trim().length > 0).map(value => {
            return <div
              className={`message my-1 ${value.createdBy === auth.user?.username ? "me" : "other"}`}
              key={value.id}>
              <div className={"d-flex align-items-start"}>
                {value.createdBy !== auth.user?.username &&
                <div
                  className="rounded-circle bg-white border-1 border-white imgContainer">
                  <Image
                    className={"img rounded-circle bg-transparent border-1 border-white p-1"}
                    unoptimized={true}
                    loader={({src}) => domain + src}
                    src={`${domain}${getProfile(value.createdBy)}`}
                    alt="Picture of the author"
                    height={45}
                    width={45}/>
                </div>
                }
                <div className="d-flex flex-column">
                  {value.createdBy !== auth.user?.username &&
                  <span
                    className="text-muted d-inline-block mx-1">{value.createdBy}</span>}
                  <span className="msg mx-1">
                  {value.message}
                </span>
                </div>
              </div>
            </div>
          })}

        </InfiniteScroll>
        <style jsx>{`
          .other {
            display: flex;
            justify-content: start;
            margin-left: 10px;
          }

          .msg {
            display: inline-block;
            border-radius: 10px;
            padding: 5px;
          }

          .other .msg {
            background: #eee;
            color: black;
          }

          .me {
            display: flex;
            justify-content: end;
            margin-right: 10px;
          }

          .me .msg {
            background: #0070f3;
            color: white;
          }
        `}</style>
      </div>
    </EventSourceHook>
  );
};

export default ChatMessages;
