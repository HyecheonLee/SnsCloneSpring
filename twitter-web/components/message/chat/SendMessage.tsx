import React, { useState } from "react";
import { sendMessage } from '../../../apis/chatApi'

interface IProps {
  chatRoomId: string
}

const SendMessage: React.FC<IProps> = ({...props}) => {
  const {chatRoomId} = props
  const [message, setMessage] = useState("");

  const onMessageHandler = async () => {
    await sendMessage({chatRoomId, message})
    setMessage("")
  }
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }

  const onKeyDownHandler = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await onMessageHandler()
    }
  }

  return (<>

    <div className="p-3 d-flex flex-shrink-0">
      <textarea className="flex-grow-1 rounded-pill border-0"
                rows={1}
                placeholder="메시지를 입력해 주세요."
                style={{
                  resize: "none",
                  height: "38px",
                  padding: "8px 13px",
                  background: "rgba(0,0,0,0.05)"
                }} onChange={onChangeHandler}
                value={message}
                onKeyPress={onKeyDownHandler}
      />
      <button onClick={onMessageHandler} type="submit" className="text-primary fs-4">
        <i className="fas fa-paper-plane"/>
      </button>
    </div>
  </>);
};

export default SendMessage;
