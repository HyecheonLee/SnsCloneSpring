import React, { FunctionComponent } from "react";
import Layout from '../../../components/layout/Layout'
import NewMessageContainer from '../../../components/message/new/NewMessageContainer'

interface IProps {
}

const index: React.FC<IProps> = ({...props}) => {
  return (<Layout title="New message">
    <NewMessageContainer/>
  </Layout>);
};

export default index;
