import React from "react";
import Image from 'next/image'
import { domain } from '../../utils/apiUtils'
import { UserType } from '../../types/user'
import Link from "next/link";

interface IProps {
  user: UserType
}

const ProfileHeader: React.FC<IProps> = ({...props}) => {
  const {user} = props
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
      </div>
    </div>
    <div className={"text-end p-3"} style={{minHeight: 66}}>
      <a className={"rounded-pill ms-3 btn btn-outline-primary"}
         style={{padding: "5px 15px"}}>
        <i className={"fas fa-envelope"}/>
      </a>
      <a className={"rounded-pill ms-3 fw-bold btn btn-outline-primary active"}>
        Following
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
    </div>
    <div className={"d-flex flex-column p-3"}>
      <span>{user.firstName} {user.lastName}</span>
      <span>@{user.username}</span>
      <span>description</span>
      <div>
        <Link href={`/profile/${user.username}/following`}>
          <a className={"me-2 text-underline-hover"}>
            <span className={"fw-bold text-black"}>0&nbsp;&nbsp;</span>
            <span className={"text-muted"}>Following</span>
          </a>
        </Link>
        <Link href={`/profile/${user.username}/followers`}>
          <a className={"me-2 text-underline-hover"}>
            <span className={"fw-bold text-black"}>0&nbsp;&nbsp;</span>
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
