import React from "react";
import Portal from '../Portal'
import { Modal } from 'react-bootstrap'
import { useSelector } from '../../store'
import Loading from '../Loading'


const LoadingModal = () => {
  let modal = useSelector(state => state.modal)
  if (modal.type === "loading" && modal.isShow) {
    return (<Portal selector={"#modal"}>
      <Modal
        show={modal.isShow}
        backdrop="static"
        keyboard={false}
        centered>
        <Modal.Body className="text-center">
          <Loading message={modal.message}/>
        </Modal.Body>
      </Modal>
    </Portal>);
  }
  return null;
};

export default LoadingModal;
