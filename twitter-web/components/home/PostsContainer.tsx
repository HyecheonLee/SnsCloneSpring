import React, { useEffect } from 'react';
import { apiV1Post } from '../../utils/apiUtils'
import { ApiResponseType } from '../../types/api'
import { PostType } from '../../types/post'
import Post from './Post'
import { useAppDispatch, useSelector } from '../../store'
import { postActions } from '../../store/post'
import modal from '../../store/modal'

const PostsContainer = () => {
  const dispatch = useAppDispatch()
  const {posts, hasNext} = useSelector(state => state.post)
  const {fetchPosts} = postActions
  useEffect(() => {
    fetchPost();
  }, []);

  function fetchPost() {
    dispatch(modal.actions.showLoading())
    let postId = 0
    if (posts.length > 0) {
      postId = posts[posts.length - 1].id
    }
    apiV1Post.get<ApiResponseType<PostType[]>>(`?postId=${postId}&size=10`)
      .then(value => value.data?.data as PostType[])
      .then(value => {
        if (!value) {
          value = []
        }
        dispatch(fetchPosts(value));
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

  const nextClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetchPost();
  }

  return (
    <div className="container p-0">
      {posts.map((post) => {
        return <Post key={`post_${post.id}`} post={post} deletePost={deletePost}/>
      })}
      {hasNext &&
      <button onClick={nextClickHandler}
              className={"btn w-100 btn-info btn-lg text-white"}>다음</button>}
    </div>
  );
};

export default React.memo(PostsContainer);
