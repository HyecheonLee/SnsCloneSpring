import React from "react";
import Portal from './Portal'
import { Bars } from 'react-loading-icons'
import { Modal } from 'react-bootstrap'

interface IProps {
  show: boolean,
  message?: string
}

const LoadingModal: React.FC<IProps> = ({...props}) => {
  return (<Portal selector={"#modal"}>
    <Modal
      show={props.show}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Body className="text-center">
        <Bars fill={"#06bcee"}/>
        <div className="display-2"
             style={{color: "#06bcee"}}>{props.message || "Loading..."}</div>
      </Modal.Body>
    </Modal>
  </Portal>);
};

export default LoadingModal;
