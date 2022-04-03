import React, { useState } from "react";
import Image from 'next/image'
import { apiV1Chat, domain } from '../../../utils/apiUtils'
import { ChatRoomType } from '../../../types/chat'
import ChatRoomChangeModal from '../../modal/ChatRoomNameChangeModal'
import { patchChatRoom } from '../../../apis/chatApi'

interface IProps {
  data: ChatRoomType
}

const SHOW_SIZE = 2
const ChatHeader: React.FC<IProps> = ({...props}) => {
  const {data} = props
  const [isShow, setIsShow] = useState(false);
  const [chatRoomName, setChatRoomName] = useState(data.chatRoomName);
  let profiles = data.users.map(value => value.profilePic)
  if (profiles.length > SHOW_SIZE) {
    profiles = profiles.slice(0, SHOW_SIZE)
  }
  const onPatchHandler = (roomName: string) => {
    patchChatRoom(data.id, {chatRoomName: roomName})
      .then(value => value.ok)
      .then(value => {
        setIsShow(false)
        setChatRoomName(roomName)
      });
  }

  const showModal = () => {
    setIsShow(true);
  }
  return (<>
    <div className="border-bottom d-flex align-items-center py-2">
      {profiles.map((profile, index) => {
        return <div key={profile}
                    className="rounded-circle bg-white border-1 border-white"
                    style={{
                      height: `40px`,
                      width: `40px`,
                      marginLeft: `${index === 0 ? 0 : -10}px`,
                      zIndex: `${index * -1}`
                    }}>
          <Image
            className={"img rounded-circle bg-transparent border-1 border-white p-1"}
            unoptimized={true}
            loader={({src}) => domain + src}
            src={`${domain}${profile}`}
            alt="Picture of the author"
            height={40}
            width={40}/>
        </div>
      })}
      {data.users.length > profiles.length &&
      <div
        className="text-muted rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: "40px",
          height: "40px",
          background: "#f1f1f1",
          marginLeft: "-10px",
          zIndex: `${data.users.length * -1}`
        }}
      >+{data.users.length - profiles.length}</div>}
      <div onClick={showModal} className="btn ms-4 fs-4">{chatRoomName}</div>
    </div>
    <ChatRoomChangeModal isShow={isShow} setShow={setIsShow}
                         chatRoomName={chatRoomName}
                         onPatchHandler={onPatchHandler}
    />
  </>);
};

export default ChatHeader;
