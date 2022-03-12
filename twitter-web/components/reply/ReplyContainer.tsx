import React, { useEffect } from "react";
import Post from '../home/Post'
import modal from '../../store/modal'
import { apiV1Post } from '../../utils/apiUtils'
import { ApiResponseType } from '../../types/api'
import { PostType } from '../../types/post'
import { replyActions } from '../../store/reply'
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
      await dispatch(modal.actions.showLoading())
      await apiV1Post.delete("/" + id).then(value => {
        if (value.ok) {
          dispatch(postActions.deletePost(id))
        }
      })
      await dispatch(modal.actions.removeModal());
    }

    const nextClickHandler = () => {
      fetchReply();
    }

    if (replies.length === 0) {
      return <div
        className={"w-100 text-center p-5"}>
        <h1 className={"display-1 fw-bold"}> has no data</h1>
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
