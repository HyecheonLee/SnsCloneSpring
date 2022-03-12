import React, { useEffect } from "react";
import Layout from '../../components/layout/Layout'
import { useRouter } from 'next/router'
import { apiV1Post } from '../../utils/apiUtils'
import ReplyContainer from '../../components/reply/ReplyContainer'
import { ApiResponseType } from '../../types/api'
import { PostType } from '../../types/post'
import { useAppDispatch, useSelector } from '../../store'
import ReplyPost from '../../components/reply/ReplyPost'
import { postActions } from '../../store/post'

interface IProps {
}

const Index: React.FC<IProps> = ({...props}) => {
  const router = useRouter()
  const postId = parseInt(router.query.id as string, 10)
  const {currentPost} = useSelector(state => state.post)
  const dispatch = useAppDispatch()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!currentPost) {
      getPost()
    }
    if (currentPost && currentPost.id !== postId) {
      getPost()
    }
  }, [postId]);

  const getPost = () => {
    apiV1Post.get<ApiResponseType<PostType>>(`/${postId}`).then(value => {
      if (value.ok) {
        return value.data
      }
    }).then(value => {
      if (value) {
        const data = value.data
        dispatch(postActions.setCurrentPost(data))
      }
    });
  }


  return (<Layout title={"View Post"}>
    {currentPost &&
    <div className="d-flex border-bottom border-5 flex-shrink-0 p-3">
      <ReplyPost post={currentPost}/>
    </div>}
    <ReplyContainer postId={postId}/>
  </Layout>);
};

export default Index;
