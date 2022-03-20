import React, { useEffect, useState } from "react";
import Loading from '../Loading'
import InfiniteScroll from 'react-infinite-scroll-component'
import { apiV1Post } from '../../utils/apiUtils'
import { ApiResponseType } from '../../types/api'
import Post from '../home/Post'
import { PostType } from '../../types/post'

interface IProps {
  keyword?: string
}

const PostContainer: React.FC<IProps> = ({...props}) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(false);

  useEffect(() => {
    setPosts([]);
    fetchPost()
  }, [props.keyword]);

  const fetchPost = () => {
    let lastId = Number.MAX_SAFE_INTEGER;
    apiV1Post.get<ApiResponseType<PostType[]>>(`/search?keyword=${props.keyword}&lastId=${lastId}`)
      .then(value => value.data)
      .then(value => {
        if (value) {
          setPosts(prevState => [...prevState, ...value.data])
          setHasNext(value.data.length >= 10)
        }
      })
  }

  return (<>
    <InfiniteScroll
      dataLength={posts.length} //This is important field to render the next data
      next={fetchPost}
      hasMore={hasNext}
      loader={<Loading width={50} height={50} fontSize={16}/>}>
      {posts.map((post) => {
        return <Post key={`post_${post.id}`} post={post}/>
      })}
    </InfiniteScroll>
    {posts.length === 0 && <div className={"text-center display-6"}>검색 데이터가 없습니다.</div>}
  </>);
};

export default PostContainer;
