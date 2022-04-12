import React from "react";
import { useRouter } from 'next/router'
import Layout from '../../../components/layout/Layout'
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
