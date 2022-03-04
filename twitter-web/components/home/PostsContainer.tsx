import React, { useEffect } from 'react';
import useSWR from 'swr'
import { apiV1Post, apiV1PostUrl } from '../../utils/apiUtils'
import { ApiResponseType } from '../../types/api'
import { PostType } from '../../types/post'
import Post from './Post'
import usePostEvent from '../notify/PostEvenHook'

const PostsContainer = () => {
  const {setPosts, posts, setListening} = usePostEvent()
  useEffect(() => {
    apiV1Post.get<ApiResponseType<PostType[]>>("")
      .then(value => {
        return value.data?.data as PostType[]
      }).then(value => {
      setPosts([...value]);
      setListening(true);
    })
  }, []);

  return (
    <div className="container">
      {posts.map((post) => {
        return <Post key={post.id} post={post}/>
      })}
    </div>
  );
};

export default React.memo(PostsContainer);
