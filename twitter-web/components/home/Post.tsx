import React from 'react';
import Image from 'next/image'
import { PostType } from '../../types/post'
import dayjs from 'dayjs';

const Post = ({post}: { post: PostType }) => {
  let {postedBy} = post
  const timeDiff = dayjs(postedBy.createdAt).toNow()

  return (
    <div className="post" data-id="${postData._id}">
      <div className="mainContentContainer">
        <div className="userImageContainer">
          <Image
            unoptimized={true}
            loader={({src}) => "http://localhost:8080" + src}
            src={`/${postedBy?.profilePic}`}
            alt="Picture of the author"
            width={50} height={50}/>
        </div>
        <div className="postContentContainer">
          <div className="header">

            <a href="/profile/${postedBy.username}"
               className="displayName">{postedBy.firstName + " " + postedBy.lastName}</a>
            <span className="username">@{postedBy.username}</span>
            <span className="date">{timeDiff}</span>
          </div>
          <div className="postBody">
            <span>{post.content}</span>
          </div>
          <div className="postFooter">
            <div className="postButtonContainer">
              <button>
                <i className="fas fa-comment"></i>
              </button>
            </div>
            <div className="postButtonContainer">
              <button>
                <i className="fas fa-retweet"></i>
              </button>
            </div>
            <div className="postButtonContainer">
              <button className="likeButton">
                <i className="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .post {
          display: flex;
          flex-direction: column;
          padding: var(--spacing);
          cursor: pointer;
          border-bottom: 1px solid var(--lightGery);
        }

        .mainContentContainer {
          display: flex;
        }

        .postFooter {
          display: flex;
          align-items: center;
        }

        .postFooter .postButtonContainer {
          flex: 1;
          display: flex;
        }

        .postFooter .postButtonContainer button {
          padding: 2px 5px;
        }

        .header a:hover {
          text-decoration: underline;
        }

        .header a,
        .header span {
          padding-right: 5px;
        }

        .postButtonContainer button:hover {
          background-color: var(--buttonHoverBg);
          color: var(--blue);
          border-radius: 50%;
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
      `}
      </style>
    </div>
  );
};

export default Post;

