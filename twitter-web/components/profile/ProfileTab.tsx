import React, { useState } from "react";

interface IProps {
  tab: string,
  setTab: Function
}

const ProfileTab: React.FC<IProps> = ({...props}) => {
  const {tab, setTab} = props
  return (<>
    <ul>
      <li className={`p-3 ${tab === "post" && "active"}`} onClick={e => setTab("post")}>
        <a className={"fw-bold text-muted"}>Posts</a>
      </li>
      <li className={`p-3 ${tab === "reply" && "active"}`} onClick={e => setTab("reply")}>
        <a className={"fw-bold text-muted"}>Replies</a>
      </li>
    </ul>
    <style jsx>{`
      ul {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0;
      }

      li {
        box-sizing: border-box;
        flex: 1;
        text-align: center;
        cursor: pointer;
        border-bottom: 2px solid #dee2e6;
      }

      li a {
        text-decoration: none;
        padding: 3px;
      }

      li:hover {
        background: #9BD1F9;
      }

      li.active {
        border-bottom: 3px solid #1fa2f1 !important;
      }

      li.active a {
        color: #1fa2f1 !important;
      }

    `}</style>
  </>);
};

export default ProfileTab;
