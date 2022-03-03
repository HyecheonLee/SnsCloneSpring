import React from 'react';
import useSWR from 'swr'
import { apiV1Post, apiV1PostUrl } from '../../utils/apiUtils'
import { ApiResponseType } from '../../types/api'
import { PostType } from '../../types/post'
import Post from './Post'

const PostsContainer = () => {
  const {data, error} = useSWR(apiV1PostUrl, url => {
    return apiV1Post.get<ApiResponseType<PostType[]>>("")
      .then(value => {
        return value.data
      })
      .then(value => {
        return value?.data
      });
  });

  if (error || !data) {
    return <div>Loading...</div>
  }
  return (
    <div className="container">
      {data.map((post) => {
        return <Post key={post.id} post={post}/>
      })}
    </div>
  );
};

export default React.memo(PostsContainer);
