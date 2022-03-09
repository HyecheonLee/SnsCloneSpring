import React, { useCallback, useState } from 'react';
import Image from 'next/image'
import { PostType } from '../../types/post'
import { apiV1Post, domain } from '../../utils/apiUtils'
import { dayjs } from '../../utils/DayjsUtils';
import { useDispatch } from 'react-redux'
import { replyActions } from '../../store/reply'
import { useSelector } from '../../store'


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


const Post = ({
                post,
                deletePost
              }: { post: PostType, deletePost: (id: number) => void }) => {
  const {postedBy} = post

  const timeDiff = dayjs(post.createdAt).fromNow();
  const [like, setLike] = useState(post.userLike);
  const {user} = useSelector(state => state.auth)
  let dispatch = useDispatch()

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
  const showReply = () => {
    const {showReply} = replyActions
    dispatch(showReply(post))
  }
  let replyCnt = post.postStatus?.replyCnt

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
          <div className="d-flex text-center">
            <div className="flex-fill d-flex align-items-center">
              <button onClick={showReply}
                      className={`${(replyCnt && replyCnt > 0) ? "active" : "text-black-50"}`}>
                <i className="rounded-circle p-1 fas fa-comment"/>
              </button>
              <span
                className={`${(replyCnt && replyCnt > 0) ? "active" : "text-black-50"}`}>
                {post.postStatus?.replyCnt || ""}
              </span>
            </div>
            <div className="flex-fill d-flex align-items-center">
              <button>
                <i className="rounded-circle p-1 fas fa-retweet"/>
              </button>
            </div>
            <div className={`flex-fill d-flex align-items-center`}>
              <button onClick={likeButton}
                      className={`mx-1  ${like ? "active" : "text-black-50"}`}>
                <i className="rounded-circle p-1 fas fa-heart"></i>
              </button>
              <span
                className={`${like ? "active" : "text-black-50"}`}>{post.postStatus?.likeCnt || 0}</span>
            </div>
            {user?.id === postedBy.id && <div className={"position-absolute end-0"}>
              <button onClick={e => deletePost(post.id)}>
                <i className="rounded-circle p-1 fas fa-trash"/>
              </button>
            </div>}
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

