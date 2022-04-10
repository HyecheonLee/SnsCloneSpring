import React from "react";
import Layout from '../../components/layout/Layout'
import NotificationsContainer from '../../components/notifications/NotificationsContainer'

interface IProps {
}

const index: React.FC<IProps> = ({...props}) => {
  return (<Layout title={"알람"}>
    <NotificationsContainer/>
  </Layout>);
};

export default index;
