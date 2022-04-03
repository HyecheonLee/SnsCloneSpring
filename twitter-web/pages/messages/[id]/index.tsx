import React from "react";
import { useRouter } from 'next/router'
import useSWR from "swr";
import { fetchChatRoom } from '../../../apis/chatApi'
import Layout from '../../../components/layout/Layout'
import { useAppDispatch } from '../../../store'
import { modalActions } from '../../../store/modal'
import Loading from '../../../components/Loading'
import ChatContainer from '../../../components/message/ChatContainer'

interface IProps {
}

const index: React.FC<IProps> = ({...props}) => {
  const router = useRouter()
  const id = router.query.id as string
  return (<Layout title="채팅">
    <ChatContainer id={id}/>
  </Layout>);
};

export default index;
