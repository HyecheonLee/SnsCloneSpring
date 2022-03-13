import React from "react";
import Image from 'next/image'
import { domain } from '../../utils/apiUtils'
import { PostType } from '../../types/post'
import { dayjs } from '../../utils/DayjsUtils'

interface IProps {
  post: PostType
}

const ReplyPost: React.FC<IProps> = ({...props}) => {

  const {post} = props;
  const {postedBy} = post;
  const timeDiff = dayjs(post.createdAt).fromNow();

  return (<>
    <div className="d-flex p-3">
      <div>
        <Image
          className={"rounded-circle bg-white"}
          unoptimized={true}
          loader={({src}) => domain + src}
          src={`${domain}${postedBy?.profilePic}`}
          alt="Picture of the author"
          width={50} height={50}/>
      </div>
      <div className="d-flex flex-column flex-fill ps-3 position-relative">
        <div className={"d-flex align-items-center"}>
          <a
            className="fw-bold text-decoration-none">{postedBy.firstName + " " + postedBy.lastName}</a>
          <span className="text-muted">@{postedBy.username}</span>
          <span className="text-muted mx-2">{timeDiff}</span>
        </div>
        <div>
          <span>{post.content}</span>
        </div>
      </div>
    </div>
  </>);
};

export default ReplyPost;
