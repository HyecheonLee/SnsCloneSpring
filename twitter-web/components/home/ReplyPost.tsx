import React from "react";
import Image from 'next/image'
import { domain } from '../../utils/apiUtils'
import { PostType } from '../../types/post'

interface IProps {
  post: PostType
}

const ReplyPost: React.FC<IProps> = ({...props}) => {

  const {post} = props;

  return (<>
    <div className="d-flex flex-shrink-0 p-1">
      <div>
        {post && post.postedBy.profilePic &&
        <Image className={"rounded-circle bg-white"}
               unoptimized={true}
               loader={({src}) => domain + src}
               src={`${domain}${post.postedBy.profilePic}`}
               alt="Picture of the author"
               width={50} height={50}/>}
      </div>
      <div className="ps-2">{post && post.content}</div>
    </div>
  </>);
};

export default ReplyPost;
