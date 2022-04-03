import React from "react";
import Layout from '../../components/layout/Layout'
import MessageContainer from '../../components/message/MessageContainer'

interface IProps {
}

const index: React.FC<IProps> = ({...props}) => {
  return (<Layout title={"채팅목록"}>
    <MessageContainer/>
  </Layout>);
};

export default index;
