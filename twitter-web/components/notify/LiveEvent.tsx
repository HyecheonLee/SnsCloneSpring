import React, { useEffect } from "react";
import { PostStatusType, PostType } from '../../types/post'
import { useAppDispatch } from '../../store'
import { postActions } from '../../store/post'
import { EventType } from '../../types/api'
import { profileActions } from '../../store/profile'
import { UserType } from '../../types/user'

interface IProps {
}


function postEvent(event: EventType<any>, dispatch: any) {
  const {newPost, deletePost, updatePost, updateStatus} = postActions
  if (event.type === "newPost") {
    let data = event.data as PostType;
    dispatch(newPost(data));

  }

  if (event.type === "deletePost") {
    const postId = event.data as number
    dispatch(deletePost(postId));
  }

  if (event.type === "updatedPostStatus") {
    const data = event.data as PostStatusType;
    data.postId && dispatch(updateStatus({
      postId: data.postId,
      status: data
    }));
  }

}

const LiveEvent: React.FC<IProps> = ({...props}) => {
  const postEventUrl = `http://localhost:8080/api/v1/notify/post`
  const dispatch: any = useAppDispatch()

  useEffect(() => {
    const source = eventSource()
    return () => {
      source.then(value => value.close());
    };
  }, []);


  async function eventSource() {
    const source: EventSource = await new EventSource(postEventUrl, {withCredentials: true});

    source.onopen = (e) => {
      console.log('SSE opened!');
    }

    source.onmessage = (e) => {
      const event = JSON.parse(e.data);
      postEvent(event, dispatch);
      if (event.type === "followStatus") {
        dispatch(profileActions.setFollowStatus(event.data))
      }
      if (event.type === "user") {
        dispatch(profileActions.setUser(event.data))
      }
    }

    source.onerror = (e) => {
      source?.close();
    }

    return source;
  }

  return (<>
    {props.children}
  </>);
};

export default LiveEvent;
