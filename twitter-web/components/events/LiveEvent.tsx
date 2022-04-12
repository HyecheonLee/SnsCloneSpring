import React, { useEffect } from "react";
import { postActions } from '../../store/post'
import { EventKindType, EventType } from '../../types/api'
import { profileActions } from '../../store/profile'
import { domain } from '../../utils/apiUtils'
import { fetchChatStatus } from '../../apis/chatApi'
import { chatActions } from '../../store/chat'
import { useAppDispatch } from '../../store'
import { NotifyType } from '../../types/event'
import { updateNotifyCount } from '../../apis/notifyApi'
import { notifyActions } from '../../store/notify'
import { ChatStatusType, ChatType } from '../../types/chat'
import { useRouter } from 'next/router'
import { NextRouter } from 'next/dist/client/router'

interface IProps {
}

const getEvents = (dispatch: any, router: NextRouter) => {
  const events = new Map<EventKindType, (e: any) => void>()

  events.set("updatedPost", (event: any) => {
    dispatch(profileActions.updatedPost(event))
    dispatch(postActions.updatePost(event))
  });

  events.set("followStatus", (event: any) => {
    dispatch(profileActions.setFollowStatus(event))
  });

  events.set("user", (event: any) => {
    dispatch(profileActions.setUser(event))
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
    const pathname = router.pathname
    if (pathname === `/messages/${event.chatRoomId}`) return
    const result: ChatStatusType | undefined = await fetchChatStatus(event.chatRoomId);
    result && dispatch(chatActions.fetchChat(result))
  })

  events.set("notify", (event: NotifyType) => {
    updateNotifyCount(dispatch)
    dispatch(notifyActions.eventNotify(event))
  });

  return events;
}

const LiveEvent: React.FC<IProps> = ({...props}) => {
  const postEventUrl = `${domain}/api/v1/event`
  const dispatch = useAppDispatch()
  const router = useRouter()
  useEffect(() => {
    const events = getEvents(dispatch, router)
    const source: EventSource = new EventSource(postEventUrl, {withCredentials: true});
    source.onopen = (e) => {
      console.log('SSE opened!');
    }
    source.onmessage = (e) => {
      const result: EventType<any> = JSON.parse(e.data);
      console.log(result.kind, result.data);
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
