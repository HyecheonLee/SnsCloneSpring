import React, { useEffect, useState } from "react";
import { apiV1User } from '../../../utils/apiUtils'
import { useRouter } from 'next/router'
import { ApiResponseType } from '../../../types/api'
import { UserType } from '../../../types/user'
import UserProfile from './UserProfile'
import Loading from '../../Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

interface IProps {
}

const Follower: React.FC<IProps> = ({...props}) => {
  const router = useRouter()
  const username = router.query.username as string
  const [follows, setFollows] = useState<UserType[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(false);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    let lastId = 0;
    if (follows.length > 0) lastId = follows[follows.length - 1].id
    apiV1User.get<ApiResponseType<UserType[]>>(`/${username}/follower?lastId=${lastId}`)
      .then(value => value.data)
      .then(value => {
        if (value) {
          setHasNext(value.data.length >= 10)
          setFollows(value.data)
        }
      });
  }

  return (<>
    <InfiniteScroll
      dataLength={follows.length} //This is important field to render the next data
      next={fetch}
      hasMore={hasNext}
      loader={<Loading width={50} height={50} fontSize={16}/>}>
      {follows.map(value => {
        return <UserProfile key={value.id} user={value}/>
      })}
    </InfiniteScroll>

  </>);
};

export default Follower;
