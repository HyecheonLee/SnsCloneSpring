import React from "react";
import { ChatRoomType } from '../../types/chat'
import Image from 'next/image'
import { domain } from '../../utils/apiUtils'
import Link from "next/link";

interface IProps {
  chatRoom: ChatRoomType
}

function getTop(size: number, index: number) {
  switch (size) {
    case 1:
      return 0
    case 2:
      switch (index) {
        case 1:
          return 0
        default:
          return 20
      }
    case 3:
      switch (index) {
        case 1:
          return 0
        default:
          return 20
      }
    default:
      switch (index) {
        case 1:
        case 2:
          return 0
        case 3:
        case 4:
          return 40
      }
  }
}

function getLeft(size: number, index: number) {
  switch (size) {
    case 1:
      return 0
    case 2:
      switch (index) {
        case 1:
          return 0
        default:
          return 20
      }
    case 3:
      switch (index) {
        case 1:
          return 10
        case 2:
          return 0
        default:
          return 20
      }
    default:
      switch (index) {
        case 1:
        case 2:
          return 0
        case 3:
        case 4:
          return 20
      }
  }
}

function imgSize(size: number) {
  switch (size) {
    case 1:
      return 60
    case 2:
    case 3:
      return 40
    default:
      return 30
  }
}

const ChatItem: React.FC<IProps> = ({...props}) => {
    const {chatRoom} = props
    const tempProfiles = chatRoom.users.map(value => value.profilePic)
    let profiles = tempProfiles
    if (tempProfiles.length > 4) {
      profiles = tempProfiles.slice(0, 4)
    }
    return (
      <>
        <Link href={`/messages/${chatRoom.id}`}>
          <a className="list-group-item list-group-item-action rounded-0 border-end-0 border-top-0 border-start-0 border-bottom-1
         d-flex align-items-center">
            <div className="position-relative me-3" style={{height: `60px`, width: "60px"}}>
              {profiles.map(profile => {
                return <div key={profile}
                            className="rounded-circle bg-white border-1 border-white imgContainer
                           position-absolute" style={{
                  height: `${imgSize(profiles.length)}px`,
                  width: `${imgSize(profiles.length)}px`
                }}>
                  <Image
                    className={"img rounded-circle bg-transparent border-1 border-white p-1"}
                    unoptimized={true}
                    loader={({src}) => domain + src}
                    src={`${domain}${profile}`}
                    alt="Picture of the author"
                    layout={"fill"}/>
                </div>
              })}
              <style jsx>{`
                .imgContainer:nth-child(1) {
                  top: ${getTop(profiles.length, 1)}px;
                  left: ${getLeft(profiles.length, 1)}px;
                }

                .imgContainer:nth-child(2) {
                  top: ${getTop(profiles.length, 2)}px;
                  left: ${getLeft(profiles.length, 2)}px;
                }

                .imgContainer:nth-child(3) {
                  top: ${getTop(profiles.length, 3)}px;
                  left: ${getLeft(profiles.length, 3)}px;
                }

                .imgContainer:nth-child(4) {
                  top: ${getTop(profiles.length, 4)}px;
                  left: ${getLeft(profiles.length, 4)}px;
                }
              `}</style>
            </div>
            <div className="flex-grow-1">
              <div className="fw-bold fs-3">{chatRoom.chatRoomName}</div>
              <div className="text-muted fs-6">{chatRoom.lastMessage}</div>
            </div>
          </a>
        </Link>
      </>
    );
  }
;

export default ChatItem;
