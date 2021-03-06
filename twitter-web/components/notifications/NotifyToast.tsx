import React, { FunctionComponent, useState } from "react";
import { Toast } from "react-bootstrap";
import { useSelector } from '../../store'
import NotifyToastItem from './NotifyToastItem'
import dayjs from 'dayjs'

interface IProps {
}

const NotifyToast: React.FC<IProps> = ({...props}) => {
    const [show, setShow] = useState(true);
    const notify = useSelector(state => state.notify)
    let notifies = notify.notifies.filter(value => !value.checked)
      .filter(value => {
        return dayjs(value.createdAt).diff(new Date(), "second") > -30
      })
    if (notify.notifies.length > 5) {
      notifies = notifies.slice(0, 5)
    }
    return (
      <div className="position-fixed top-0"
           style={{right: "20px"}}>
        {notifies.map(notify => {
          return <NotifyToastItem notify={notify} key={notify.id}/>
        })}
      </div>);
  }
;

export default NotifyToast;
