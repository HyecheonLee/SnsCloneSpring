import React, { useEffect, useState } from 'react';
import { apiV1Post } from '../../utils/apiUtils'
import { ApiResponseType } from '../../types/api'
import { PostType } from '../../types/post'
import Post from './Post'
import usePostEvent from '../notify/PostEvenHook'

const PostsContainer = () => {
  const {setPosts, posts, setListening} = usePostEvent()
  const [postId, setPostId] = useState(0)
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    fetchPost()
    setListening(true)
  }, []);

  function resultPost(value: PostType[] | null) {
    if (value) {
      setPosts(prevState => [...prevState, ...value]);
      let postType = value[value.length - 1]
      setPostId(postType.id);
    }

    if (!value || value.length < 10) setHasNext(false);
    else setHasNext(true);
  }

  function fetchPost() {
    apiV1Post.get<ApiResponseType<PostType[]>>(`?postId=${postId}&size=10`)
      .then(value => value.data?.data as PostType[])
      .then(value => resultPost(value))
  }

  const nextClickHandler = () => {
    fetchPost()
  }

  return (
    <div className="container">
      {posts.map((post) => {
        return <Post key={post.id} post={post}/>
      })}
      {hasNext &&
      <button onClick={nextClickHandler}
              className={"btn w-100 btn-info btn-lg"}>다음</button>}
    </div>
  );
};

export default React.memo(PostsContainer);
