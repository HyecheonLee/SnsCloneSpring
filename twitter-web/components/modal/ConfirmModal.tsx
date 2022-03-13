import React from "react";
import { useAppDispatch, useSelector } from '../../store'
import Portal from '../Portal'
import { Button, Modal } from 'react-bootstrap'
import { modalActions } from '../../store/modal'
import { useRouter } from 'next/router'

interface IProps {
}

const ConfirmModal: React.FC<IProps> = ({...props}) => {

  const modal = useSelector(state => state.modal)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleClose = () => {
    modal.onClose && modal.onClose()
  };
  const handleClick = async () => {
    modal.onClick && modal.onClick()
  }

  if (modal.type === "confirm" && modal.isShow) {
    return (<Portal selector={"#modal"}>
      <Modal
        show={modal.isShow}
        backdrop="static"
        keyboard={false}
        centered
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modal?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modal?.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"primary"} color={"white"} className={"text-white"}
                  onClick={handleClick}>확인</Button>
        </Modal.Footer>
      </Modal>
    </Portal>);
  }
  return null;
};

export default ConfirmModal;
