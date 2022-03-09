import React, { FunctionComponent, useEffect, useRef } from "react";
import { dayjs } from '../../utils/DayjsUtils'
import { ReplyType } from '../../types/reply'

interface IProps {
  reply: ReplyType
}

const Reply: React.FC<IProps> = ({...props}) => {
  const {reply} = props
  const ref = useRef<HTMLSpanElement>(null);
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

  const onClick = () => {

  }
  return <>
    <div className="d-flex align-items-center justify-content-between mt-3">
      <a style={{minWidth: "100px"}}
         className="btn btn-link text-decoration-none d-inline-block py-0">by {reply.createdBy}</a>
      <span ref={ref} className={`flex-fill text-truncate`}>{reply.content}</span>
      <span className={"text-muted text-end"}
            style={{minWidth: "70px"}}>{timeDiff}</span>
    </div>
  </>
};

export default Reply;
