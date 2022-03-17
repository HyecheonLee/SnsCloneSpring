import React, { useState } from "react";
import { useRouter } from 'next/router'
import Layout from '../../../components/layout/Layout'
import TabComponent from '../../../components/TabComponent'
import Following from '../../../components/profile/follow/Following'
import Follower from '../../../components/profile/follow/Follower'

interface IProps {
}

const follower: React.FC<IProps> = ({...props}) => {
  const router = useRouter()
  const username = router.query.username as string
  const [currentTab, setCurrentTab] = useState("Followers");

  const clickTab = (tab: string) => async (e: any) => {
    if (tab === "Following")
      await router.push(`/profile/${username}/following`)
  }

  return (<Layout title={username}>
    <TabComponent items={["Following", "Followers"]} currentTab={currentTab}
                  setTab={clickTab}/>
    <Follower/>
  </Layout>)
};

export default follower;
