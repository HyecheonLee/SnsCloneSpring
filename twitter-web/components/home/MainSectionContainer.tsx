import React, { useEffect } from 'react';
import { useSelector } from '../../store'
import PostForm from './PostForm'
import PostsContainer from './PostsContainer'
import ReplyModal from './ReplyModal'

const MainSectionContainer = () => {
  const {user} = useSelector(state => state.auth)

  useEffect(() => {
    return () => {
    };
  }, []);

  return (
    <>
      <div className="col-10 col-md-8 col-lg-6">
        <div>
          <h1 className={"display-6 fw-bold"}>Home [ {user?.username} ]</h1>
        </div>
        <PostForm/>
        <PostsContainer/>
      </div>
      <ReplyModal/>
    </>
  );
};

export default MainSectionContainer;
