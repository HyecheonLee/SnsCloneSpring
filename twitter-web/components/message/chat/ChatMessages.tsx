import React, { useCallback } from "react";
import EventSourceHook from '../../hooks/EventSourceHook'
import { ChatRoomType } from '../../../types/chat'
import _ from "lodash";
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from '../../../store'
import { domain } from '../../../utils/apiUtils'
import Image from 'next/image'
import { useChatMessage } from './ChatMessageHook'
import { dayjs } from '../../../utils/DayjsUtils'


interface IProps {
  chatRoom: ChatRoomType,
}


const ChatMessages: React.FC<IProps> = ({...props}) => {
  const {chatRoom} = props
  const {hasNext, messages, messageFetch, events} = useChatMessage(chatRoom.id)

  const auth = useSelector(state => state.auth);

  const getProfile = useCallback((username: string) => {
      const result = _.find(chatRoom.users, value => value.username === username)
      return result?.profilePic
    },
    [chatRoom],
  );

  return (
    <EventSourceHook
      eventUrl={`${domain}/api/v1/event/chat/${chatRoom.id}`}
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
          {messages.filter(value => value.message.trim().length > 0).map((value, index) => {
            const nextValue = messages[index - 1]
            const createdAt = dayjs(value.createdAt).format("a hh:mm")
            let nonDispTime = false
            if (nextValue) {
              nonDispTime = value.createdBy === nextValue.createdBy && createdAt == dayjs(nextValue.createdAt).format("a hh:mm")
            }
            let dispDay = false
            if (nextValue) {
              dispDay = dayjs(nextValue.createdAt).get("day") !== dayjs(value.createdAt).get("day")
            }

            return <>
              {dispDay && <div className="text-center">
                <span
                  className="text-muted">{dayjs(nextValue.createdAt).format("YYYY/MM/DD")}</span>
              </div>}
              <div
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
                  {!nonDispTime && <div
                    className={`align-self-end ${value.createdBy === auth.user?.username ? "order-first" : "order-last"}`}>
                  <span
                    className="text-muted">{dayjs(value.createdAt).format("a hh:mm")}</span>
                  </div>}
                </div>
              </div>
            </>
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
