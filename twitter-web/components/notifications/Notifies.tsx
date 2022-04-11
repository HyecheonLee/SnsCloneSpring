import React, { useEffect } from "react";
import Loading from '../Loading'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppDispatch, useSelector } from '../../store'
import { checkNotifyAll, fetchNotify, updateNotifyCount } from '../../apis/notifyApi'
import { notifyActions } from '../../store/notify'
import NotifyItem from './NotifyItem'

interface IProps {
}

const Notifies: React.FC<IProps> = ({...props}) => {
  const notify = useSelector(state => state.notify)
  const dispatch = useAppDispatch()
  const notifies = notify.notifies
  useEffect(() => {
    initFetch()
  }, []);

  const fetch = async () => {
    let result;
    if (notifies.length > 0) {
      result = await fetchNotify(notifies[notifies.length - 1].id)
    } else {
      result = await fetchNotify()
    }
    dispatch(notifyActions.fetch(result));
  }
  const initFetch = async () => {
    const result = await fetchNotify()
    dispatch(notifyActions.init(result));
  }
  const allCheckNotifyClickHandler = async () => {
    await checkNotifyAll()
    await updateNotifyCount(dispatch)
  }

  return (<>
    <button disabled={notify.count === 0} className="btn btn-link"
            onClick={allCheckNotifyClickHandler}
            style={{position: "absolute", right: "15px", top: "5px"}}>
      <i className="fas fa fa-check-square fa-2x fw-bolder"/>
    </button>
    <InfiniteScroll
      dataLength={notifies.length} //This is important field to render the next data
      next={fetch}
      hasMore={notify.hasNext}
      loader={<Loading width={50} height={50} fontSize={16}/>}>
      {notifies.map((notify) => {
        return <NotifyItem key={notify.id} notify={notify}/>
      })}
    </InfiniteScroll>
  </>);
};

export default Notifies;
