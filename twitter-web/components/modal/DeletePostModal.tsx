import React from "react";
import { useSelector } from '../../store'
import Portal from '../Portal'
import { Button, Modal } from 'react-bootstrap'

interface IProps {
}

const DeletePostModal: React.FC<IProps> = ({...props}) => {

  const modal = useSelector(state => state.modal)
  const handleClose = () => {
    modal.onClose && modal.onClose()
  };
  const handleClick = async () => {
    modal.onClick && modal.onClick()
  }
  if (modal.type === "deletePost" && modal.isShow) {
    return (<Portal selector={"#modal"}>
      <Modal
        show={modal.isShow}
        backdrop="static"
        keyboard={false}
        centered
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>게시물을 삭제하시겠습니까?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>이 게시물을 다시는 볼 수 없습니다.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"secondary"} onClick={handleClose} color={"white"}>취소</Button>
          <Button variant={"danger"} color={"white"}
                  onClick={handleClick}>삭제</Button>
        </Modal.Footer>
      </Modal>
    </Portal>);
  }
  return null;
};

export default DeletePostModal;
