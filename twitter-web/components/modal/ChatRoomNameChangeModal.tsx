import React, { useState } from "react";
import { useSelector } from '../../store'
import Portal from '../Portal'
import { Button, Modal } from 'react-bootstrap'
import { Cropper } from 'react-cropper'
import "cropperjs/dist/cropper.css";
import { ChatRoomType } from '../../types/chat'
import { patchChatRoom } from '../../apis/chatApi'

interface IProps {
  chatRoomName: string,
  onPatchHandler: (roomName: string) => void
  isShow: boolean,
  setShow: (show: boolean) => void,
}

const ChatRoomChangeModal: React.FC<IProps> = ({...props}) => {
  const {onPatchHandler, isShow, setShow} = props
  const [chatRoomName, setChatRoomName] = useState(props.chatRoomName);
  const handleClose = () => {
    setShow(false)
  }

  return (<Modal
    show={isShow}
    backdrop="static"
    keyboard={true}
    centered
    onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>채팅방 이름 변경</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <input value={chatRoomName} onChange={e => setChatRoomName(e.target.value)}/>
    </Modal.Body>
    <Modal.Footer>
      <Button variant={"secondary"} color={"white"} className={"text-white"}
              onClick={handleClose}>취소</Button>
      <Button variant={"primary"} color={"white"} className={"text-white"}
              onClick={() => onPatchHandler(chatRoomName)}>확인</Button>
    </Modal.Footer>
  </Modal>);

};

export default ChatRoomChangeModal;
