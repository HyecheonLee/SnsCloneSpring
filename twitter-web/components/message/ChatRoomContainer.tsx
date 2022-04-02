import React, { FunctionComponent } from "react";
import useSWR from 'swr'
import { fetchChatRoom } from '../../apis/chatApi'
import Loading from '../Loading'

interface IProps {
  id: string
}

const ChatRoomContainer: React.FC<IProps> = ({...props}) => {
  const {id} = props
  const {data, error} = useSWR(`/room/${id}`, () => {
    return fetchChatRoom(id)
  });
  if (!data) {
    return <Loading/>
  }
  return (<>

  </>);
};

export default ChatRoomContainer;
