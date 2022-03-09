import React, { FunctionComponent, useEffect, useRef } from "react";
import { dayjs } from '../../utils/DayjsUtils'
import { ReplyType } from '../../types/reply'
import { useSelector } from '../../store'

interface IProps {
  reply: ReplyType
  deleteReply: (id: number) => void
}

const Reply: React.FC<IProps> = ({...props}) => {
  const {reply, deleteReply} = props
  const ref = useRef<HTMLTextAreaElement>(null);
  const auth = useSelector(state => state.auth)

  const timeDiff = dayjs(reply.createdAt).fromNow();

  useEffect(() => {
    let span = ref.current
    if (span && span.offsetWidth < span.scrollWidth) {
      span.style.cursor = "pointer";
      span.addEventListener("click", ev => {
        span?.classList.toggle("text-truncate");
      });
    }
  }, []);


  return <>
    <div className="d-flex align-items-center justify-content-between my-2">
      <a style={{minWidth: "100px"}}
         className="btn btn-link text-decoration-none d-inline-block py-0">by {reply.createdBy}</a>
      <span ref={ref}
            className={`flex-fill text-truncate`}>{reply.content}</span>
      <span className={"text-muted text-end"}
            style={{minWidth: "70px"}}>{timeDiff}</span>
    </div>
    <div className={"d-flex justify-content-end pe-3"}>
      {auth.user?.username === reply.createdBy && <>
        <button onClick={e => deleteReply(reply.id)}>
          <i className={"fas fa-trash"}/>
        </button>
      </>}
    </div>
  </>
};

export default Reply;
