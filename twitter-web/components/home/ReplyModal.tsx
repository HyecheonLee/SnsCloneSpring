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

interface IProps {
}


const ReplyModal: React.FC<IProps> = ({...props}) => {

  const {show, post} = useSelector(state => state.reply)

  const [hasNext, setHasNext] = useState(false);

  const dispatch = useDispatch();

  const [replies, setReplies] = useState<ReplyType[]>([]);

  const repliesFetch = (replyId?: number) => {
    let lastReplyId = 0;

    if (replyId !== undefined) {
      lastReplyId = replyId
    } else {
      if (replies.length > 0) {
        lastReplyId = replies[replies.length - 1].id
      }
    }

    console.log("replayId:", replyId, "lastReplyId:", lastReplyId);

    apiV1Reply.get<ApiResponseType<ReplyType[]>>(`/post/${post?.id}?replyId=${lastReplyId}`)
      .then(value => {
        return value.data
      })
      .then(value => {
        if (value) {
          if (value.data.length < 5) {
            setHasNext(false)
          } else {
            setHasNext(true)
          }
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

  useEffect(() => {
    if (show) {
      repliesFetch()
    }
  }, [show]);

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
        <ReplyPost post={post}/>
        <hr/>
        <ReplyForm post={post} fetch={repliesFetch}/>
        <hr/>
        <ReplyContainer replies={replies}/>
      </Modal.Body>
      }
      {<Modal.Footer>
        <button disabled={!hasNext}
                className={`${hasNext ? "text-primary" : "text-second"} w-100`}
                onClick={e => repliesFetch()}>더보기
        </button>
      </Modal.Footer>}
    </Modal>
  </>);
};

export default ReplyModal;
