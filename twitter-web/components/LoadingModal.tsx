import React from "react";
import Portal from './Portal'
import { Bars } from 'react-loading-icons'
import { Modal } from 'react-bootstrap'
import { useSelector } from '../store'


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
          <Bars fill={"#06bcee"}/>
          <div className="display-2"
               style={{color: "#06bcee"}}>{modal.message || "Loading..."}</div>
        </Modal.Body>
      </Modal>
    </Portal>);
  }
  return null;
};

export default LoadingModal;
