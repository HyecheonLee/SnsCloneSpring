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
          }}
          inverse={true}
          hasMore={hasNext}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv">
          {messages.filter(value => value.message.trim().length > 0).map((value, index) => {
            const nextValue = messages[index - 1]
            const preValue = messages[index + 1]

            const createdAt = dayjs(value.createdAt).format("a hh:mm")

            let firstMsg: boolean
            if (!preValue) firstMsg = true
            else {
              firstMsg = createdAt !== dayjs(preValue.createdAt).format("a hh:mm") || preValue.createdBy !== value.createdBy
            }

            let lastMsg: boolean

            if (!nextValue) lastMsg = true
            else {
              lastMsg = nextValue.createdBy !== value.createdBy || createdAt !== dayjs(nextValue.createdAt).format("a hh:mm")
            }

            let dispDay = ""
            if (preValue && dayjs(preValue.createdAt).get("day") !== dayjs(value.createdAt).get("day")) {
              dispDay = dayjs(value.createdAt).format("YYYY년 MM월 DD일 (dddd)")
            }
            if (!preValue) {
              dispDay = dayjs(value.createdAt).format("YYYY년 MM월 DD일 (dddd)")
            }


            return <React.Fragment key={`message_${value.id}`}>
              <div
                className={`message my-1 ${value.createdBy === auth.user?.username ? "me" : "other"}`}>
                <div className={"d-flex align-items-start"}>
                  {value.createdBy !== auth.user?.username &&
                  <div
                    className="rounded-circle bg-white border-1 border-white imgContainer"
                    style={{width: 40}}>
                    {firstMsg && <Image
                      className={"img rounded-circle bg-transparent border-1 border-white p-1"}
                      unoptimized={true}
                      loader={({src}) => domain + src}
                      src={`${domain}${getProfile(value.createdBy)}`}
                      alt="Picture of the author"
                      height={40}
                      width={40}/>
                    }
                  </div>}
                  <div className="d-flex flex-column">
                    {value.createdBy !== auth.user?.username && firstMsg &&
                    <span
                      className="text-muted d-inline-block mx-1">{value.createdBy}</span>
                    }
                    <pre
                      className={` msg my-0 mx-1 ${firstMsg && "first"} ${lastMsg && "last"}`}>{value.message}</pre>
                  </div>
                  {lastMsg && <div
                    className={`mx-1 align-self-end ${value.createdBy === auth.user?.username ? "order-first" : "order-last"}`}>
                  <span
                    className="text-muted d-inline-block"
                    style={{fontSize: "10px", width: "50px"}}>{createdAt}</span>
                  </div>}
                </div>
              </div>
              {dispDay && <div className="text-center d-flex align-items-center">
                <hr className="flex-grow-1"/>
                <span
                  className="text-white mx-3 rounded-pill bg-info px-3">{dispDay}</span>
                <hr className={"flex-grow-1"}/>
              </div>
              }
            </React.Fragment>
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
            border-radius: 20px;
            line-height: 1.2;
            padding: 5px 20px;
            font-size: 14px;
            font-weight: 400;
          }

          .other .msg {
            background: #eee;
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
            color: #6c757d;
          }

          .other .msg.first {
            border-bottom-left-radius: 2px;
            border-top-left-radius: 18px;
          }

          .other .msg.last {
            border-top-left-radius: 2px;
            border-bottom-left-radius: 18px;
          }


          .me {
            display: flex;
            justify-content: end;
            margin-right: 10px;
          }

          .me .msg {
            background: #1fa2f1;
            color: white;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
          }

          .me .msg.first {
            border-bottom-right-radius: 2px;
            border-top-right-radius: 18px;
          }

          .me .msg.last {
            border-top-right-radius: 2px;
            border-bottom-right-radius: 18px;
          }

        `}</style>
      </div>
    </EventSourceHook>
  );
};

export default ChatMessages;
