import React, { FunctionComponent, useEffect, useState } from "react";
import { PostType } from '../../types/post'

interface IProps {

}

const usePostEvent = () => {
  let postEventUrl = `http://localhost:8080/api/v1/notify/post`
  const [listening, setListening] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    let source: EventSource | null = null;
    if (listening) {
      source = new EventSource(postEventUrl, {withCredentials: true});
      source.addEventListener('open', () => {
        console.log('SSE opened!');
      });

      source.addEventListener('message', (e) => {
        const data: PostType = JSON.parse(e.data);
        setPosts(prevState => [data, ...prevState]);
      });

      source.addEventListener('error', (e) => {
        console.error('Error: ', e);
      });
    }
    return () => {
      if (source) {
        source.close();
      }
    };
  }, [listening]);
  return {setListening, posts, setPosts};
};

export default usePostEvent;
