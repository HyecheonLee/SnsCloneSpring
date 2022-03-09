import React, { useCallback, useState } from 'react';
import Image from 'next/image'
import { PostType } from '../../types/post'
import { apiV1Post, domain } from '../../utils/apiUtils'
import { dayjs } from '../../utils/DayjsUtils';


const postLike = async (id: number) => {
  return await apiV1Post.post(`/${id}/like`).then(value => {
    return value
  });
}
const postUnLike = async (id: number) => {
  return await apiV1Post.delete(`/${id}/unlike`).then(value => {
    return value
  });
}


const Post = ({post}: { post: PostType }) => {
  const {postedBy} = post

  const timeDiff = dayjs(post.createdAt).fromNow();
  const [like, setLike] = useState(post.userLike);


  const likeButton = useCallback(async (e: any) => {
    const nextLike = !like;
    const currentLike = like;

    setLike(nextLike)

    let result;
    if (nextLike) {
      result = await postLike(post.id)
    } else {
      result = await postUnLike(post.id)
    }

    if (!result.ok) {
      setLike(currentLike);
    }
  }, [like]);


  return (
    <div className="post" data-id="${postData._id}">
      <div className="d-flex">
        <div>
          <Image
            className={"rounded-circle bg-white"}
            unoptimized={true}
            loader={({src}) => domain + src}
            src={`${domain}${postedBy?.profilePic}`}
            alt="Picture of the author"
            width={50} height={50}/>
        </div>
        <div className="postContentContainer">
          <div>
            <a
              className="fw-bold text-decoration-none">{postedBy.firstName + " " + postedBy.lastName}</a>
            <span className="text-muted">@{postedBy.username}</span>
            <span className="text-muted">{timeDiff}</span>
          </div>
          <div>
            <span>{post.content}</span>
          </div>
          <div className="d-flex text-center">
            <div className="flex-fill d-flex align-items-center">
              <button>
                <i className="rounded-circle p-1 fas fa-comment"></i>
              </button>
            </div>
            <div className="flex-fill d-flex align-items-center">
              <button>
                <i className="rounded-circle p-1 fas fa-retweet"></i>
              </button>
            </div>
            <div
              className={`flex-fill d-flex align-items-center`}>
              <button onClick={likeButton}
                      className={`mx-1  ${like ? "active" : "text-black-50"}`}>
                <i className="rounded-circle p-1 fas fa-heart"></i>
              </button>
              <span
                className={`${like ? "active" : "text-black-50"}`}>{post.postStatus?.likeCnt || 0}</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        button:hover {
          background-color: var(--buttonHoverBg);
          color: var(--blue);
          border-radius: 50%;
        }
      `}
      </style>
    </div>
  );
};

export default Post;

