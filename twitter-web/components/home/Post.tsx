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
import Link from 'next/link';
import { modalActions } from '../../store/modal'


interface IProps {
  post: PostType
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


const Post: React.FC<IProps> = ({post}) => {
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

  const onDeleteBtnClickHandler = async (e: any) => {
    e.stopPropagation();
    dispatch(modalActions.showModal({
      type: "deletePost",
      onClose: () => {
        dispatch(modalActions.removeModal())
      },
      onClick: () => {
        apiV1Post.delete("/" + post.id).then(value => {
          if (value.ok) {
            dispatch(postActions.deletePost(post.id))
          }
        });
        dispatch(modalActions.removeModal());
      }
    }));
  }
  const onClickHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(postActions.setCurrentPost(post))
    await router.push(`/post/${post.id}`)
  }
  const onPinClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch(modalActions.showModal({
      type: "confirm",
      title: "게시물을 고정하겠습니까?",
      message: "이 게시물은 당신의 프로필 위에 나타납니다.",
      onClick: async () => {
        await apiV1Post.post(`/${post.id}/pin`)
        await dispatch(modalActions.removeModal())
      },
      onClose: () => {
        dispatch(modalActions.removeModal())
      }
    }))
  }
  const onUnPinClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch(modalActions.showModal({
      type: "confirm",
      title: "게시물 고정을 해지 하겠습니까?",
      message: "이 게시물은 당신의 프로필 위에서 사라집니다.",
      onClick: async () => {
        await apiV1Post.delete(`/${post.id}/unPin`)
        await dispatch(modalActions.removeModal())
      },
      onClose: () => {
        dispatch(modalActions.removeModal())
      }
    }))
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
            <Link href={`/profile/${postedBy.username}`}>
              <a onClick={e => e.stopPropagation()}
                 className="fw-bold text-decoration-none">{postedBy.firstName + " " + postedBy.lastName}</a>
            </Link>
            <span className="text-muted mx-2">@{postedBy.username}</span>
            <span className="text-muted mx-2 flex-fill">{timeDiff}</span>
            {user?.id === postedBy.id && <>
              <span>
                {post.postStatus?.isPin &&
                <button onClick={onUnPinClickHandler}>
                  <i className="rounded-circle p-1 fas fa-thumbtack text-primary"/>
                </button>
                }
                {!post.postStatus?.isPin &&
                <button onClick={onPinClickHandler}>
                  <i className="rounded-circle p-1 fas fa-thumbtack"/>
                </button>
                }
            </span>
              <span>
              <button onClick={onDeleteBtnClickHandler}>
                <i className="rounded-circle p-1 fas fa-times"/>
              </button>
            </span>
            </>}
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
                <i className="rounded-circle p-1 fas fa-heart"/>
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

