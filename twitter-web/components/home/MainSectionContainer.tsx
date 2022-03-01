import React, { useEffect } from 'react';
import Post from './Post'
import { useSelector } from '../../store'
import PostForm from './PostForm'
import { apiV1Post, apiV1PostUrl } from '../../apiUtils'
import useSWR from 'swr';
import axios from 'axios'
import { ApiResponseType } from '../../types/api'
import { PostType } from '../../types/post'
import PostsContainer from './PostsContainer'

const MainSectionContainer = () => {
  const {user} = useSelector(state => state.auth)

  useEffect(() => {
    return () => {
    };
  }, []);

  return (
    <>
      <div className="mainSectionContainer col-10 col-md-8 col-lg-6">
        <div className={"titleContainer"}>
          <h1 className={"display-6 fw-bold"}>Home</h1>
        </div>
        <PostForm/>
        <PostsContainer/>
      </div>

      <style jsx>{`
        .mainSectionContainer {
          padding: 0;
          border-left: 1px solid var(--lightGery);
          border-right: 1px solid var(--lightGery);
          display: flex;
          flex-direction: column;
        }

        .titleContainer {
          height: 53px;
          padding: 0 15px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--lightGery);
          flex-shrink: 0;
        }

        .titleContainer h1 {
          flex: 1;
        }

        .postFormContainer {
          display: flex;
          padding: 15px;
          border-bottom: 10px solid rgb(230, 236, 240);
          flex-shrink: 0;
        }


        .username, .date {
          color: var(--greyText);
        }

        .userImageContainer {
          width: 50px;
          height: 50px;
        }

        .userImageContainer img {
          width: 100%;
          border-radius: 50%;
          background-color: white;
        }

        .textareaContainer {
          flex: 1;
          padding-left: var(--spacing);
        }

        .textareaContainer textarea {
          width: 100%;
          border: none;
          resize: none;
          font-size: 19px;
        }


        #submitPostButton {
          background-color: var(--blue);
          color: white;
          border: none;
          border-radius: 40px;
          padding: 7px 15px;
        }

        #submitPostButton:disabled {
          background-color: var(--bludLight);
        }

        .displayName {
          font-weight: bold;
        }

        .postContentContainer {
          padding-left: var(--spacing);
          display: flex;
          flex-direction: column;
          flex: 1;
        }
      `}</style>
    </>
  );
};

export default MainSectionContainer;
