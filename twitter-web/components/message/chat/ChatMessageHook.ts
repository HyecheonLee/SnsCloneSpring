import { ChatMessageType } from '../../../types/chat'
import { useEffect, useState } from 'react'
import { fetchChatMessage, msgCheck } from '../../../apis/chatApi'
import _ from 'lodash'
import { EventKindType } from '../../../types/api'
import { isScroll } from '../../../utils/ElementUtils'

export const useChatMessage = (chatRoomId: number | string) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const events = new Map<EventKindType, (data: any) => void>();

  useEffect(() => {
    messageFetch()
  }, [chatRoomId]);

  useEffect(() => {
    if (hasNext) {
      const scrollable = document.getElementById("scrollableDiv")
      if (!isScroll(scrollable)) {
        messageFetch()
      }
    }
  }, [hasNext, messages.length]);

  const messageFetch = () => {
    let result;
    if (messages.length > 0) {
      result = fetchChatMessage(chatRoomId, messages[messages.length - 1].id)
    } else {
      result = fetchChatMessage(chatRoomId)
    }
    result.then(value => {
      setHasNext(value.length >= 10)
      const newMsg = [...messages, ...value]
      setMessages(newMsg)
      if (newMsg.length > 0) {
        msgCheck(chatRoomId, newMsg[0].id);
      }
    });
  }

  events.set("chatMessage", (data: ChatMessageType) => {
    msgCheck(data.chatRoomId, data.id);
    setMessages(prevState => {
      const msg = _.uniqBy([...prevState, data], "id")
      return _.orderBy(msg, ["id"], ["desc"]);
    });
  });

  return {messages, hasNext, messageFetch, events}
}
