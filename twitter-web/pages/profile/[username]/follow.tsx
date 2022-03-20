import React, { useState } from "react";
import TabComponent from '../../../components/TabComponent'
import Layout from '../../../components/layout/Layout'
import { useRouter } from 'next/router'
import Following from '../../../components/profile/follow/Following'
import Follower from '../../../components/profile/follow/Follower'

interface IProps {
}

const index: React.FC<IProps> = ({...props}) => {
  const router = useRouter()
  const act = router.query.act as string
  const username = router.query.username as string
  const [currentTab, setCurrentTab] = useState(act || "Following");

  return (<Layout title={username}>
    <TabComponent items={["Following", "Followers"]} currentTab={currentTab}
                  setTab={setCurrentTab}/>
    {currentTab === "Following" && <Following/>}
    {currentTab === "Followers" && <Follower/>}
  </Layout>)
};

export default index;
