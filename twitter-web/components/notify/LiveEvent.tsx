import React, { useEffect } from "react";
import { postActions } from '../../store/post'
import { EventKindType, EventType } from '../../types/api'
import { profileActions } from '../../store/profile'
import { domain } from '../../utils/apiUtils'
import { fetchChatStatus } from '../../apis/chatApi'
import { chatActions } from '../../store/chat'
import { useAppDispatch } from '../../store'

interface IProps {
}

const getEvents = (dispatch: any) => {
  const events = new Map<EventKindType, (e: any) => void>()

  events.set("updatedPost", (event: any) => {
    dispatch(profileActions.updatedPost(event.data))
    dispatch(postActions.updatePost(event.data))
  });

  events.set("followStatus", (event: any) => {
    dispatch(profileActions.setFollowStatus(event.data))
  });

  events.set("user", (event: any) => {
    dispatch(profileActions.setUser(event.data))
  });
  events.set("newPost", (event: any) => {
    dispatch(postActions.newPost(event));
  });
  events.set("deletePost", (event: any) => {
    dispatch(postActions.deletePost(event));
  });

  events.set("updatedPostStatus", (event: any) => {
    event.postId && dispatch(postActions.updateStatus({
      postId: event.postId,
      status: event
    }));
  });


  events.set("chatStatus", async (event: any) => {
    const result = await fetchChatStatus(event.chatRoomId)
    dispatch(chatActions.fetchChat(result))
  })

  return events;
}

const LiveEvent: React.FC<IProps> = ({...props}) => {
  const postEventUrl = `${domain}/api/v1/event/notify`
  const dispatch = useAppDispatch()
  useEffect(() => {
    const events = getEvents(dispatch)
    const source: EventSource = new EventSource(postEventUrl, {withCredentials: true});
    source.onopen = (e) => {
      console.log('SSE opened!');
    }
    source.onmessage = (e) => {
      const result: EventType<any> = JSON.parse(e.data);
      const event = events.get(result.kind)
      if (event) {
        event((result.data))
      }
    }
    source.onerror = (e) => {
      source.close();
    }
    return () => {
      source.close();
    };
  }, []);

  return (<>
    {props.children}
  </>);
};

export default LiveEvent;
