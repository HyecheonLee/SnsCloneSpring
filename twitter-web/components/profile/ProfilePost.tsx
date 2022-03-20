import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../Loading'
import Post from '../home/Post'
import { apiV1Post } from '../../utils/apiUtils'
import { ApiResponseType } from '../../types/api'
import { PostType } from '../../types/post'
import { useAppDispatch, useSelector } from '../../store'
import { profileActions } from '../../store/profile'
import { modalActions } from '../../store/modal'
import { postActions } from '../../store/post'

interface IProps {
  tab: string
}

const ProfilePost: React.FC<IProps> = ({...props}) => {
    const router = useRouter()
    const username = router.query.username as string
    const {posts, hasNextPost} = useSelector(state => state.profile)
    const dispatch = useAppDispatch()

    useEffect(() => {
      fetchPost()
    }, [username]);

    function fetchPost() {
      let postId = 0
      if (posts.length > 0) {
        postId = posts[posts.length - 1].id
      }
      apiV1Post.get<ApiResponseType<PostType[]>>(`?postId=${postId}&postedBy=${username}`)
        .then(value => value.data?.data as PostType[])
        .then(value => {
          if (!value) {
            value = []
          }
          dispatch(profileActions.fetchPost(value));
        })
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

    const pins = posts.filter(post => post.postStatus?.isPin)

    return (<>
      {
        pins.map(post => {
          if (!post.postStatus?.isPin) return null
          return <Post key={`post_pin_${post.id}`} post={post} deletePost={deletePost}/>
        })
      }
      {pins && pins.length > 0 &&
      <hr className={"m-0"}
          style={{height: "10px", width: "100%", background: "#6c757d"}}/>}
      <InfiniteScroll
        className={`${props.tab !== "post" && "d-none"}`}
        dataLength={posts.length} //This is important field to render the next data
        next={fetchPost}
        hasMore={hasNextPost}
        loader={<Loading width={50} height={50} fontSize={16}/>}>
        {posts.map((post) => {
          return <Post key={`post_${post.id}`} post={post} deletePost={deletePost}/>
        })}
      </InfiniteScroll>
    </>);
  }
;

export default ProfilePost;
