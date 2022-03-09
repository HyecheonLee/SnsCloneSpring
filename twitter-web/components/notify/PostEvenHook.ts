import { useEffect, useState } from "react";
import { PostStatusType, PostType } from '../../types/post'

interface IProps {

}

const usePostEvent = () => {
  let postEventUrl = `http://localhost:8080/api/v1/notify/post`
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    const source = eventSource()
    return () => {
      source.then(value => value.close());
    };
  }, []);


  async function eventSource() {
    const source: EventSource = await new EventSource(postEventUrl, {withCredentials: true});

    source.onopen = (e) => {
      console.log('SSE opened!');
    }

    source.onmessage = (e) => {
      const event = JSON.parse(e.data);
      if (event.type === "post") {
        let data = event.data as PostType;
        setPosts(prevState => {
          return [data, ...prevState]
        });
      }
      if (event.type === "postStatus") {
        const data = event.data as PostStatusType;
        setPosts(prevState => {
          const newPosts = prevState.map(post => {
            if (post.id === data.postId) {
              return {
                ...post,
                postStatus: {
                  ...data
                }
              }
            }
            return post
          })
          return [...newPosts]
        });
      }
    }

    source.onerror = (e) => {
      source?.close();
    }

    return source;
  }

  return {posts, setPosts};
};

export default usePostEvent;
