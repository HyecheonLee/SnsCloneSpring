import React, { useState } from "react";
import ChatTitleBar from '../ChatTitleBar'
import { apiV1Chat } from '../../../utils/apiUtils'
import { UserType } from '../../../types/user'
import { ApiResponseType } from '../../../types/api'
import { useAppDispatch, useSelector } from '../../../store'
import { modalActions } from '../../../store/modal'
import { useRouter } from 'next/router'

interface IProps {
}

const NewMessageContainer: React.FC<IProps> = ({...props}) => {
    const [selected, setSelected] = useState<UserType[]>([]);
    const auth = useSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const createChatRoom = () => {
      dispatch(modalActions.showLoading("채팅방 생성중..."))
      apiV1Chat.post<ApiResponseType<{ chatRoomId: number }>>("/room", {
        chatRoomName: [...selected.map(value => value.username), auth.user?.username].join(","),
        groupChat: true,
        userIds: [...selected.map(value => value.id), auth.user?.id]
      }).then(value => {
        return value.data
      }).then(async value => {
        await dispatch(modalActions.removeModal())
        await router.push(`/messages/${value?.data.chatRoomId}`)
      });
    }

    return (<>
      <div>
        <ChatTitleBar selected={selected} setSelected={setSelected}/>
      </div>
      <div className="p-3 text-center">
        <button className="rounded-pill btn btn-primary text-white"
                onClick={createChatRoom}
                disabled={selected.length === 0}>Create Chat
        </button>
      </div>
    </>);
  }
;

export default NewMessageContainer;
