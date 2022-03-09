import React, { FunctionComponent, useState } from "react";
import Image from 'next/image'
import { apiV1Post, apiV1Reply, domain } from '../../utils/apiUtils'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSelector } from '../../store'
import { useDispatch } from 'react-redux'
import { replyActions } from '../../store/reply'
import { PostType } from '../../types/post'

interface IProps {
  post: PostType
  fetch: (replyId: number) => void
}

interface FormData {
  content: string
}

const ReplyForm: React.FC<IProps> = ({...props}) => {
  const {
    register,
    reset,
    getValues,
    handleSubmit,
  } = useForm<FormData>();
  let dispatch = useDispatch()
  let {post} = props;

  const auth = useSelector(state => state.auth)

  const [enabled, setEnabled] = useState(false);

  const handleClose = () => {
    const {closeReply} = replyActions;
    dispatch(closeReply())
  };

  const onSubmit = (data: FormData) => {
    apiV1Reply.post("", {
      postId: post?.id,
      ...data
    }).then(value => {
      if (value.ok) {
        reset({
          content: ""
        });
        setEnabled(false);
        props.fetch(0);
      }
    })
  }

  function enableSubmit(content: string) {
    if (content.trim().length === 0) {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  }

  const onContentChange = (e: any) => {
    let content = e.currentTarget.value
    enableSubmit(content)
  }

  return (<>
    <div className="d-flex flex-shrink-0 p-1">
      <div>
        {auth && auth.user?.profilePic &&
        <Image className={"rounded-circle bg-white"}
               unoptimized={true}
               loader={({src}) => domain + src}
               src={`${domain}${auth.user?.profilePic}`}
               alt="Picture of the author"
               width={50} height={50}/>}
      </div>
      <div className="textareaContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea {...register("content")} onChange={onContentChange}></textarea>
          <div className="d-flex justify-content-end">
            <Button variant="primary" className="text-white" type={"submit"}
                    disabled={!enabled}>
              Reply
            </Button>
          </div>
        </form>
      </div>
    </div>
  </>);
};

export default ReplyForm;
