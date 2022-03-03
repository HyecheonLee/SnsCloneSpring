import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import { useSelector } from '../../store'
import { useForm } from 'react-hook-form'
import { apiV1Post, domain } from '../../utils/apiUtils'

interface FormData {
  content: string
}

const PostForm = () => {
  const {
    register,
    getValues,
    handleSubmit,
  } = useForm<FormData>();
  let {user} = useSelector(state => state.auth)
  const [enable, setEnabled] = useState<boolean>(false);
  useEffect(() => {
    enableSubmit(getValues("content"));
  }, []);


  const onSubmit = (data: FormData) => {
    apiV1Post.post("", data)
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
  return (
    <div className="d-flex border-bottom border-5 flex-shrink-0 p-3">
      <div>
        {user && user.profilePic && <Image
          className={"rounded-circle bg-white"}
          unoptimized={true}
          loader={({src}) => domain + src}
          src={`${domain}${user?.profilePic}`}
          alt="Picture of the author"
          width={50} height={50}/>}
      </div>
      <div className="textareaContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea {...register("content")} onChange={onContentChange}></textarea>
          <div className="buttonsContainer">
            {enable && <button type="submit" id={"submitPostButton"}>Post</button>}
            {!enable &&
            <button type="submit" id={"submitPostButton"} disabled={true}>Post</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
