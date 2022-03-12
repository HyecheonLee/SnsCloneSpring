import React, { useEffect } from 'react';
import { apiV1Post } from '../../utils/apiUtils'
import { ApiResponseType } from '../../types/api'
import { PostType } from '../../types/post'
import Post from './Post'
import { useAppDispatch, useSelector } from '../../store'
import { postActions } from '../../store/post'
import { modalActions } from '../../store/modal'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../Loading'
import DeletePostModal from '../modal/DeletePostModal'

const PostsContainer = () => {
  const dispatch = useAppDispatch()
  const {posts, hasNext} = useSelector(state => state.post)
  const {fetchPosts} = postActions
  useEffect(() => {
    fetchPost();
  }, []);

  function fetchPost() {
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
      })
  }

  const deletePost = async (id: number) => {
    dispatch(modalActions.showModal({
      type: "deletePost",
      postId: id,
    }));

  }

  return (
    <>
      <div className="container p-0">
        <InfiniteScroll
          dataLength={posts.length} //This is important field to render the next data
          next={fetchPost}
          hasMore={hasNext}
          loader={<Loading width={50} height={50} fontSize={16}/>}>
          {posts.map((post) => {
            return <Post key={`post_${post.id}`} post={post} deletePost={deletePost}/>
          })}
        </InfiniteScroll>
      </div>
      <DeletePostModal/>
    </>
  );
};

export default React.memo(PostsContainer);
