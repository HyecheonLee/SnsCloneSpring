import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from '../../store'
import { useDispatch } from 'react-redux'
import { replyActions } from '../../store/reply'
import ReplyForm from './ReplyForm'
import ReplyPost from './ReplyPost'
import ReplyContainer from './ReplyContainer'
import { apiV1Reply } from '../../utils/apiUtils'
import { ApiResponseType } from '../../types/api'
import { ReplyType } from '../../types/reply'
import { modalActions } from '../../store/modal'

interface IProps {
}


const ReplyModal: React.FC<IProps> = ({...props}) => {

    const {show, post} = useSelector(state => state.reply)

    const [hasNext, setHasNext] = useState(false);

    const dispatch = useDispatch();

    const [replies, setReplies] = useState<ReplyType[]>([]);

    const {removeModal, showLoading} = modalActions

    useEffect(() => {
      if (show) {
        repliesFetch()
      } else {
        setReplies([])
      }
    }, [show]);

    const getLastReplyId = (replyId: number | undefined) => {
      let lastReplyId = 0;
      if (replyId !== undefined) {
        lastReplyId = replyId
      } else {
        if (replies.length > 0) {
          lastReplyId = replies[replies.length - 1].id
        }
      }
      return lastReplyId
    }

    const repliesFetch = async (replyId?: number) => {
      await dispatch(showLoading());
      const lastReplyId = getLastReplyId(replyId)

      await apiV1Reply.get<ApiResponseType<ReplyType[]>>(`/post/${post?.id}?replyId=${lastReplyId}`)
        .then(value => {
          return value.data
        })
        .then(value => {
          dispatch(removeModal())
          if (value) {
            setHasNext(value.data.length >= 5)
            setReplies(prevState => {
              if (lastReplyId === 0) {
                return [...value.data]
              } else {
                return [...prevState, ...value.data]
              }
            });
          }
        });
    }

    const handleClose = () => {
      const {closeReply} = replyActions;
      dispatch(closeReply())
    };

    const deleteReply = (id: number) => {
      apiV1Reply.delete(`/${id}`)
        .then(value => {
          setReplies(prevState => {
            const newReplies = replies.filter(reply => reply.id !== id)
            return [...newReplies]
          });
        });
    }


    return (<>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reply</Modal.Title>
        </Modal.Header>
        {post &&
        <Modal.Body className="pb-0">
          <ReplyPost post={post}/>
          <hr/>
          <ReplyForm post={post} fetch={repliesFetch}/>
          {replies.length > 0 &&
          <>
            <hr/>
            <ReplyContainer replies={replies} deleteReply={deleteReply}/>
          </>}
        </Modal.Body>}
        <Modal.Footer>
          <button disabled={!hasNext}
                  className={`${hasNext ? "text-primary" : "text-second"} w-100`}
                  onClick={e => repliesFetch()}>더보기
          </button>
        </Modal.Footer>
      </Modal>
    </>);
  }
;

export default ReplyModal;
