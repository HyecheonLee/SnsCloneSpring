import React, { useState } from "react";
import TabComponent from '../TabComponent'
import SearchBar from './SearchBar'
import UserContainer from './UserContainer'
import PostContainer from './PostContainer'

interface IProps {
}

const SearchContainer: React.FC<IProps> = ({...props}) => {
  const [currentTab, setCurrentTab] = useState("Post");
  const [keyword, setKeyword] = useState("");
  return (<>
    <SearchBar setKeyword={setKeyword}/>
    <TabComponent items={["Post", "User"]} currentTab={currentTab}
                  setTab={setCurrentTab}/>
    {currentTab === "Post" && <PostContainer keyword={keyword}/>}
    {currentTab === "User" && <UserContainer keyword={keyword}/>}
  </>);
};

export default SearchContainer;
