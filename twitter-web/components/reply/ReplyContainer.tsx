import React, { useEffect } from "react";
import Post from '../home/Post'
import modal, { modalActions } from '../../store/modal'
import { apiV1Post } from '../../utils/apiUtils'
import { ApiResponseType } from '../../types/api'
import { PostType } from '../../types/post'
import { useAppDispatch, useSelector } from '../../store'
import { postActions } from '../../store/post'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../Loading'

interface IProps {
  postId: number
}

const ReplyContainer: React.FC<IProps> = ({...props}) => {
    const dispatch = useAppDispatch()
    const {replies, hasNextReplies} = useSelector(state => state.post);
    const {postId} = props

    useEffect(() => {
      fetchReply();
      return () => {
        dispatch(postActions.clearReply())
      };
    }, [postId]);


    function fetchReply() {
      dispatch(modal.actions.showLoading())
      let replyId = 0
      if (replies.length > 0) {
        replyId = replies[replies.length - 1].id
      }
      apiV1Post.get<ApiResponseType<PostType[]>>(`/${postId}/replies?postId=${replyId}&size=10`)
        .then(value => value.data?.data as PostType[])
        .then(value => {
          if (!value) {
            value = []
          }
          dispatch(postActions.fetchReplies(value))
          dispatch(modal.actions.removeModal());
        }).catch(reason => {
        dispatch(modal.actions.removeModal());
      })
    }

    const deletePost = async (id: number) => {
      dispatch(modalActions.showModal({
        type: "confirm",
        title: "게시물 삭제",
        message: "게시물을 삭제하시겠습니까?",
        onClick: () => {
          apiV1Post.delete(`/${id}`)
          dispatch(modal.actions.removeModal());
        },
        onClose: () => {
          dispatch(modal.actions.removeModal());
        }
      }));
    }


    if (replies.length === 0) {
      return <div
        className={"w-100 text-center p-5"}>
        <h1 className={"display-2 fw-bold"}>데이터가 없습니다.</h1>
      </div>
    }

    return <>
      <div className="container p-0">
        <InfiniteScroll
          dataLength={replies.length} //This is important field to render the next data
          next={fetchReply}
          hasMore={hasNextReplies}
          loader={<Loading width={50} height={50} fontSize={16}/>}>
          {replies.map((post) => {
            return <Post key={`post_${post.id}`} post={post} deletePost={deletePost}/>
          })}
        </InfiniteScroll>
      </div>
    </>
  }
;

export default ReplyContainer;
