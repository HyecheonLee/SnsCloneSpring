import React, { useEffect, useState } from "react";
import Loading from '../Loading'
import InfiniteScroll from 'react-infinite-scroll-component'
import { UserType } from '../../types/user'
import UserProfile from '../user/UserProfile'
import { apiV1User } from '../../utils/apiUtils'
import { ApiResponseType } from '../../types/api'

interface IProps {
  keyword?: string
}

const UserContainer: React.FC<IProps> = ({...props}) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(false);

  useEffect(() => {
    setUsers([]);
    fetchUser()

  }, [props.keyword]);

  const fetchUser = () => {
    let lastId = Number.MAX_SAFE_INTEGER;
    apiV1User.get<ApiResponseType<UserType[]>>(`/search?keyword=${props.keyword}&lastId=${lastId}`)
      .then(value => value.data)
      .then(value => {
        if (value) {
          setUsers(prevState => [...prevState, ...value.data])
          setHasNext(value.data.length >= 10)
        }
      })
  }

  return (<>
    <InfiniteScroll
      dataLength={users.length} //This is important field to render the next data
      next={fetchUser}
      hasMore={hasNext}
      loader={<Loading width={50} height={50} fontSize={16}/>}>
      {users.map((user) => {
        return <UserProfile key={`user_${user.id}`} user={user}/>
      })}
    </InfiniteScroll>
    {users.length === 0 && <div className={"text-center display-6"}>검색 데이터가 없습니다.</div>}
  </>);
};

export default UserContainer;
