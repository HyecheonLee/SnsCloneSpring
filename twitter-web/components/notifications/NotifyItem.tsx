import React from "react";
import { NotifyKindType, NotifyType } from '../../types/event'
import { domain } from '../../utils/apiUtils'
import Image from 'next/image'
import { checkNotify, updateNotifyCount } from '../../apis/notifyApi'
import { useAppDispatch } from '../../store'
import { notifyActions } from '../../store/notify'
import { useRouter } from 'next/router'

interface IProps {
  notify: NotifyType
}

function makeNotifyMsg(notify: NotifyType) {
  const notifyType: NotifyKindType = notify.notifyType

  if (notifyType === "LIKE") {
    return <span>{notify.fromUser.username} 이 당의 게시물에 좋아요를 눌렀습니다.</span>
  }
  if (notifyType === "FOLLOWER") {
    return <span>{notify.fromUser.username} 이 당신을 팔로우 했습니다.</span>
  }
  if (notifyType === "REPLY") {
    return <span>{notify.fromUser.username} 이 당신의 게시글에 댓글을 남겼습니다.</span>
  }
  return null;
}

const NotifyItem: React.FC<IProps> = ({...props}) => {
  const {notify} = props
  const dispatch = useAppDispatch()
  const router = useRouter()
  const onClickItem = async () => {
    const result = await checkNotify(notify.id)
    result && dispatch(notifyActions.checkNotify(notify.id))
    result && updateNotifyCount(dispatch)
    if (notify.notifyType === "LIKE" || notify.notifyType === "REPLY") {
      await router.push(`/post/${notify.targetId}`)
    }
    if (notify.notifyType === "FOLLOWER") {
      await router.push(`/profile/${notify.fromUser.username}`)
    }
  }

  return (<>
    <div
      className={`item border-bottom py-2 px-3 d-flex align-items-center ${notify.checked && 'checked'}`}
      onClick={onClickItem}>
      <div className={"d-flex flex-column"}>
        <Image
          className={"rounded-circle bg-white"}
          unoptimized={true}
          loader={({src}) => domain + src}
          src={`${domain}${notify.fromUser?.profilePic}`}
          alt="Picture of the author"
          width={50} height={50}/>
      </div>
      <div className="flex-grow-1 mx-3">{makeNotifyMsg(notify)}</div>
    </div>
    <style jsx>{`
      .item {
        cursor: pointer;
        background: rgba(155, 209, 249, 0.3);
      }

      .item.checked {
        background: rgba(234, 234, 234, 0.3);
      }

      .item:hover {
        background: #9BD1F9;
      }

      .item.checked:hover {
        background: rgba(234, 234, 234, 1);
      }
    `}</style>
  </>);
};

export default NotifyItem;
