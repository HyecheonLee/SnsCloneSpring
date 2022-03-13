import React, { useEffect, useState } from "react";
import ProfileHeader from './ProfileHeader'
import ProfileTab from './ProfileTab'
import ProfilePost from './ProfilePost'
import ProfileReply from './ProfileReply'
import { useRouter } from 'next/router'
import { UserType } from '../../types/user'
import { useAppDispatch } from '../../store'
import { apiV1User } from '../../utils/apiUtils'
import { ApiResponseType, ErrorType } from '../../types/api'
import { modalActions } from '../../store/modal'
import Loading from '../Loading'
import { profileActions } from '../../store/profile'

interface IProps {
}

const ProfileContainer: React.FC<IProps> = ({...props}) => {
  const router = useRouter()
  const [user, setUser] = useState<UserType>();
  const username = router.query.username as string
  const [tab, setTab] = useState("post");
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(profileActions.setUsername(username))
    fetchUser()
    return () => {
      dispatch(profileActions.clear())
    }
  }, [username]);

  function fetchUser() {
    apiV1User.get<ApiResponseType<UserType> | ErrorType>(`${username}`)
      .then(response => {
        if (response.ok) {
          const resp = response.data as ApiResponseType<UserType>
          setUser(resp.data);
        } else {
          console.log(response);
          dispatch(modalActions.showModal({
            type: "confirm",
            title: "사용자 오류",
            message: `해당 사용자[${username}]를 찾을수 없습니다.`,
            onClick: () => {
              router.back()
              dispatch(modalActions.removeModal())
            },
            onClose: () => {
              router.back()
              dispatch(modalActions.removeModal())
            }
          }));
        }
      });
  }


  if (!user) {
    return <Loading/>
  }

  return (<>
    <ProfileHeader user={user}/>
    <ProfileTab tab={tab} setTab={setTab}/>
    <ProfilePost tab={tab}/>
    <ProfileReply tab={tab}/>
  </>);
};

export default ProfileContainer;
