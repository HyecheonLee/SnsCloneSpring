import React, { useEffect, useState } from "react";
import Image from 'next/image'
import { apiV1Chat, apiV1File, domain } from '../../utils/apiUtils'
import Link from "next/link";
import { useAppDispatch, useSelector } from '../../store'
import { userFollowing } from '../../apis/userApis'
import { modalActions } from '../../store/modal'
import { useRouter } from 'next/router'
import { ApiResponseType } from '../../types/api'
import { UploadFileType } from '../../types/uploadFile'

interface IProps {

}

const ProfileHeader: React.FC<IProps> = ({...props}) => {
  const {user} = useSelector(state => state.profile)
  const auth = useSelector(state => state.auth)
  const [bgList, setBgList] = useState<UploadFileType[]>([]);
  useEffect(() => {
    fetchBg()
  }, []);

  const router = useRouter()
  const dispatch = useAppDispatch()

  const following = () => {
    user && userFollowing(user, dispatch)
  }

  const uploadBgModal = () => {
    dispatch(modalActions.showModal({
      type: "photoUpload",
      title: `배경 사진 업로드 `,
      message: "배경 사진을 올려주세요",
      onClose: () => {
        dispatch(modalActions.removeModal())
      },
      onClick: async (imageBase64: String) => {
        await apiV1File.post("/images", {
          imageFile: imageBase64,
          fileType: "bg"
        })
        await fetchBg()
        dispatch(modalActions.removeModal())
      }
    }));
  }

  const uploadProfileModal = () => {
    dispatch(modalActions.showModal({
      type: "photoUpload",
      title: `프로필 사진 업로드 `,
      message: "프로필 사진을 올려주세요",
      onClose: () => {
        dispatch(modalActions.removeModal())
      },
      onClick: async (imageBase64: String) => {
        await apiV1File.post("/profile", {imageFile: imageBase64})
        router.reload()
      }
    }));
  }

  const fetchBg = async () => {
    await apiV1File.get<ApiResponseType<UploadFileType[]>>(`/${user?.username}/bg`)
      .then(value => value.data)
      .then(value => {
        setBgList(value?.data || [])
      });
  }

  const onClickMsgHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    apiV1Chat.put<ApiResponseType<{ chatRoomId: number }>>("/room", {
      chatRoomName: [user?.username, auth.user?.username].join(","),
      groupChat: false,
      userIds: [user?.id, auth.user?.id]
    }).then(value => value.data)
      .then(value => value?.data)
      .then(async value => {
        await router.push(`/messages/${value?.chatRoomId}`)
      })
  }

  if (!user) return null

  return (<div className={"container p-0 m-0"}>
    <div className={"w-100 position-relative bg-primary"} style={{height: 180}}>
      {bgList.length > 0 &&
      <Image
        alt='background'
        loader={({src}) => domain + src}
        src={`${bgList[0].path}`}
        layout='fill'
        objectFit='cover'
      />
      }
      <div className={"bg w-100 h-100 position-absolute"}>
        {auth.user?.id === user.id && <>
          <button onClick={uploadBgModal}
                  className={"camera position-absolute top-0 start-0 d-flex align-items-center justify-content-center w-100 h-100"}>
            <i className={"fas fa-camera fa-3x bg-transparent"}/>
          </button>
          <style jsx>{`
            .camera {
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

      <div className={"ms-3 position-absolute"}
           style={{height: "132px", width: "132px", bottom: "-66px"}}>
        <Image
          className={"rounded-circle bg-white border border-5 border-white"}
          unoptimized={true}
          loader={({src}) => domain + src}
          src={`${domain}${user?.profilePic}`}
          alt="user profile image"
          width={132} height={132}/>
        {auth.user?.id === user.id && <>
          <button onClick={uploadProfileModal}
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
        <a onClick={onClickMsgHandler}
           className={"rounded-pill ms-3 btn btn-outline-primary"}
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
        <Link href={`/profile/${user.username}/follow?act=Following`}>
          <a className={"me-2 text-underline-hover"}>
            <span
              className={"fw-bold text-black"}>{user.followInfo?.followStatus.followingCnt}&nbsp;&nbsp;</span>
            <span className={"text-muted"}>Following</span>
          </a>
        </Link>
        <Link href={`/profile/${user.username}/follow?act=Follower`}>
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
