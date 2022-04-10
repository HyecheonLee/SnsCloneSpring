import React from "react";
import Notifies from './Notifies'

interface IProps {
}

const NotificationsContainer: React.FC<IProps> = ({...props}) => {
  return (<>
    <Notifies/>
  </>);
};

export default NotificationsContainer;
