import React, { useState } from "react";
import { Toast } from 'react-bootstrap'
import { NotifyType } from '../../types/event'
import NotifyItem from './NotifyItem'

interface IProps {
  notify: NotifyType
}

const NotifyToastItem: React.FC<IProps> = ({...props}) => {
  const {notify} = props
  const [show, setShow] = useState(!notify.checked);

  return (<>
    <Toast onClose={() => setShow(false)}
           onClick={() => setShow(false)}
           show={show} delay={30000} autohide>
      <NotifyItem notify={notify}/>
    </Toast>
  </>);
};

export default NotifyToastItem;
