import React from "react";
import Image from 'next/image'
import { domain } from '../../utils/apiUtils'
import Link from "next/link";
import { useAppDispatch, useSelector } from '../../store'
import { userFollowing } from '../../apis/userApis'
import { modalActions } from '../../store/modal'

interface IProps {

}

const ProfileHeader: React.FC<IProps> = ({...props}) => {
  const {user} = useSelector(state => state.profile)
  const auth = useSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const following = () => {
    user && userFollowing(user, dispatch)
  }
  const uploadModal = () => {
    dispatch(modalActions.showModal({
      type: "photoUpload",
      title: `프로필 사진 업로드 `,
      message: "프로필 사진을 올려주세요",
      onClose: () => {
        dispatch(modalActions.removeModal())
      }
    }));
  }

  if (!user) return null

  return (<div className={"container p-0 m-0"}>
    <div className={"bg-primary w-100 position-relative"} style={{height: 180}}>
      <div className={"ms-3 position-absolute"}
           style={{height: "132px", width: "132px", bottom: "-66px"}}>
        <Image
          className={"rounded-circle bg-white border border-5 border-white"}
          unoptimized={true}
          loader={({src}) => domain + src}
          src={`${domain}${user?.profilePic}`}
          alt="user profile image"
          width={132} height={132}/>
        {auth.user?.id === user.id &&
        <>
          <button onClick={uploadModal}
                  className={"camera position-absolute top-0 start-0 d-flex align-items-center justify-content-center w-100 h-100"}>
            <i className={"fas fa-camera fa-3x bg-transparent"}/>
          </button>
          <style jsx>{`
            .camera {
              border-radius: 50%;
              opacity: 0;
              background: rgba(0, 0, 0, 0.5);
            }

            .camera i {
              color: #6c757d;
            }

            .camera:hover {
              opacity: 1;
            }
          `}</style>
        </>
        }
      </div>
    </div>

    <div className={"text-end p-3"} style={{minHeight: 66}}>
      {user.id !== auth.user?.id && <>
        <a className={"rounded-pill ms-3 btn btn-outline-primary"}
           style={{padding: "5px 15px"}}>
          <i className={"fas fa-envelope"}/>
        </a>
        <a onClick={following}
           className={"rounded-pill ms-3 fw-bold btn btn-outline-primary active"}>
          {user.followInfo?.isFollowing ? "UnFollowing" : "Following"}
        </a>
        <style jsx>{`
          .btn-outline-primary:hover {
            background-color: #9BD1F9;
            color: white;
          }

          .btn-outline-primary.active {
            color: white;
          }
        `
        }
        </style>
      </>
      }
    </div>

    <div className={"d-flex flex-column p-3"}>
      <span>{user.firstName} {user.lastName}</span>
      <span>@{user.username}</span>
      <span>description</span>
      <div>
        <Link href={`/profile/${user.username}/following`}>
          <a className={"me-2 text-underline-hover"}>
            <span
              className={"fw-bold text-black"}>{user.followInfo?.followStatus.followingCnt}&nbsp;&nbsp;</span>
            <span className={"text-muted"}>Following</span>
          </a>
        </Link>
        <Link href={`/profile/${user.username}/follower`}>
          <a className={"me-2 text-underline-hover"}>
            <span
              className={"fw-bold text-black"}>{user.followInfo?.followStatus.followerCnt}&nbsp;&nbsp;</span>
            <span className={"text-muted"}>Followers</span>
          </a>
        </Link>
      </div>
      <style jsx>{`
        .text-underline-hover {
          text-decoration: none;
          color: black;
        }

        .text-underline-hover:hover {
          text-decoration: underline;
          color: black;
        }
      `}</style>
    </div>
  </div>);
};

export default ProfileHeader;
