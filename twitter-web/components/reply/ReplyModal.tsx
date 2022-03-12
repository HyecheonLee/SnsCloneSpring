import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from '../../store'
import { useDispatch } from 'react-redux'
import { replyActions } from '../../store/reply'
import ReplyForm from './ReplyForm'
import ReplyPost from './ReplyPost'

interface IProps {
}


const ReplyModal: React.FC<IProps> = ({...props}) => {

  const {show, post} = useSelector(state => state.reply)
  const dispatch = useDispatch();

  const handleClose = () => {
    const {closeReply} = replyActions;
    dispatch(closeReply())
  };


  return (<>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reply</Modal.Title>
      </Modal.Header>
      {post &&
      <Modal.Body className="pb-0">
        <div className="d-flex flex-shrink-0 p-1">
          <ReplyPost post={post}/>
        </div>
        <hr/>
        <ReplyForm post={post}/>
      </Modal.Body>}
    </Modal>
  </>);
}

export default ReplyModal;
