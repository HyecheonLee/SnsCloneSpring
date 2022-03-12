import React, { useState } from "react";
import { useAppDispatch, useSelector } from '../../store'
import Portal from '../Portal'
import { Button, Modal } from 'react-bootstrap'
import { modalActions } from '../../store/modal'
import { apiV1Post } from '../../utils/apiUtils'
import { postActions } from '../../store/post'
import Loading from '../Loading'

interface IProps {
}

const DeletePostModal: React.FC<IProps> = ({...props}) => {

  const modal = useSelector(state => state.modal)
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(modalActions.removeModal());
  const handleClick = async () => {
    setLoading(true);
    await apiV1Post.delete("/" + modal.postId).then(value => {
      if (value.ok) {
        dispatch(postActions.deletePost(modal.postId!!))
      }
    });
    setLoading(false);
    dispatch(modalActions.removeModal());
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
          {loading &&
          <Loading message={"삭제중입니다..."} height={50} width={50} fontSize={16}/>}
          {!loading && <p>이 게시물을 다시는 볼 수 없습니다.</p>}
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
