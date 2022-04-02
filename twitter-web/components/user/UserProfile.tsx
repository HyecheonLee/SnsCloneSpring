import React, { useState } from "react";
import { UserType } from '../../types/user'
import Image from 'next/image'
import { domain } from '../../utils/apiUtils'
import Link from 'next/link'
import { useAppDispatch, useSelector } from '../../store'
import { userFollowing } from '../../apis/userApis'

interface IProps {
  user: UserType
  onClick?: Function
}

const UserProfile: React.FC<IProps> = ({...props}) => {
  const auth = useSelector(state => state.auth)
  const {user} = props;
  const [isFollowing, setIsFollowing] = useState<boolean>(user.followInfo?.isFollowing || false);
  const dispatch: any = useAppDispatch()
  const following = async () => {
    await userFollowing(user, dispatch)
    setIsFollowing(prevState => !prevState)
  }
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClick) {
      props.onClick(e)
    }
  }
  return (<div className="post" onClick={onClickHandler}>
    <div className="d-flex">
      <div>
        <Image
          className={"rounded-circle bg-white"}
          unoptimized={true}
          loader={({src}) => domain + src}
          src={`${domain}${user?.profilePic}`}
          alt="Picture of the author"
          width={50} height={50}/>
      </div>
      <div className="d-flex flex-column flex-fill ps-3 position-relative">
        <div className={"d-flex align-items-center"}>
          <Link href={`/profile/${user.username}`}>
            <a onClick={e => e.stopPropagation()}
               className="fw-bold text-decoration-none">{user.firstName + " " + user.lastName}</a>
          </Link>
          <span className="text-muted mx-2">@{user.username}</span>
        </div>
      </div>
      <div>
        {auth.user?.id !== user.id &&
        < a
          onClick={following}
          className={"rounded-pill ms-3 fw-bold btn btn-outline-primary"}>
          {isFollowing ? "UnFollowing" : "Following"}
        </a>
        }
      </div>
    </div>
    <style jsx>{`
      button:hover {
        background-color: var(--buttonHoverBg);
        color: var(--blue);
        border-radius: 50%;
      }

      a.btn-outline-primary:hover {
        color: white;
      }
    `}
    </style>
  </div>);
};

export default UserProfile;
