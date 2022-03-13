import React, { useCallback, useState } from 'react';
import Image from 'next/image'
import { PostType } from '../../types/post'
import { apiV1Post, domain } from '../../utils/apiUtils'
import { dayjs } from '../../utils/DayjsUtils';
import { useDispatch } from 'react-redux'
import { replyActions } from '../../store/reply'
import { useSelector } from '../../store'
import { useRouter } from 'next/router'
import { postActions } from '../../store/post'


interface IProps {
  post: PostType,
  deletePost: (id: number) => void
}

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


const Post: React.FC<IProps> = ({post, deletePost}) => {
  const {postedBy} = post

  const timeDiff = dayjs(post.createdAt).fromNow();
  const [like, setLike] = useState(post.userLike);
  const {user} = useSelector(state => state.auth)
  let dispatch = useDispatch()
  const router = useRouter()

  const likeButton = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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

  const showReply = (e: any) => {
    e.stopPropagation();
    const {showReply} = replyActions
    dispatch(showReply(post))
  }

  const onDeleteBtnClickHandler = (e: any) => {
    e.stopPropagation();
    deletePost(post.id)
  }
  const onClickHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(postActions.setCurrentPost(post))
    await router.push(`/post/${post.id}`)
  }

  const replyCnt = post.postStatus?.replyCnt

  return (
    <div className="post" data-id="${postData._id}" onClick={onClickHandler}>
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
            <span className="text-muted mx-2">@{postedBy.username}</span>
            <span className="text-muted mx-2 flex-fill">{timeDiff}</span>
            {user?.id === postedBy.id && <span>
              <button onClick={onDeleteBtnClickHandler}>
                <i className="rounded-circle p-1 fas fa-times"/>
              </button>
            </span>}
          </div>
          <div>
            <span className={"h3"}>{post.content}</span>
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

