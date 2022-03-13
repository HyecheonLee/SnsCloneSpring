import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { useAppDispatch, useSelector } from '../../store'
import { apiV1Post } from '../../utils/apiUtils'
import { ApiResponseType } from '../../types/api'
import { PostType } from '../../types/post'
import { profileActions } from '../../store/profile'
import { modalActions } from '../../store/modal'
import { postActions } from '../../store/post'
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from '../Loading'
import Post from "../home/Post";

interface IProps {
  tab: string
}

const ProfileReply: React.FC<IProps> = ({...props}) => {

  const router = useRouter()
  const username = router.query.username as string
  const {replies, hasNextReply} = useSelector(state => state.profile)
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchReply()
  }, [username]);

  function fetchReply() {
    let postId = 0
    if (replies.length > 0) {
      postId = replies[replies.length - 1].id
    }

    apiV1Post.get<ApiResponseType<PostType[]>>(`/replies?postId=${postId}&postedBy=${username}`)
      .then(value => value.data?.data as PostType[])
      .then(value => {
        if (!value) {
          value = []
        }
        dispatch(profileActions.fetchReply(value));
      });
  }

  function deletePost(id: number) {
    dispatch(modalActions.showModal({
      type: "deletePost",
      onClose: () => {
        dispatch(modalActions.removeModal())
      },
      onClick: () => {
        apiV1Post.delete("/" + id).then(value => {
          if (value.ok) {
            dispatch(postActions.deletePost(id))
          }
        });
        dispatch(modalActions.removeModal());
      }
    }));
  }

  return <InfiniteScroll
    className={`${props.tab !== "reply" && "d-none"}`}
    dataLength={replies.length} //This is important field to render the next data
    next={fetchReply}
    hasMore={hasNextReply}
    loader={<Loading width={50} height={50} fontSize={16}/>}>
    {replies.map((post) => {
      return <Post key={`post_${post.id}`} post={post} deletePost={deletePost}/>
    })}
  </InfiniteScroll>;
};

export default ProfileReply;
