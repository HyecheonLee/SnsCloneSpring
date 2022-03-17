import React, { useState } from "react";
import { useRouter } from 'next/router'
import Layout from '../../../components/layout/Layout'
import TabComponent from '../../../components/TabComponent'
import Following from '../../../components/profile/follow/Following'

interface IProps {
}

const following: React.FC<IProps> = ({...props}) => {
  const router = useRouter()
  const username = router.query.username as string
  const [currentTab, setCurrentTab] = useState("Following");
  const clickTab = (tab: string) => async (e: any) => {
    if (tab === "Followers")
      await router.push(`/profile/${username}/follower`)
  }
  return (<Layout title={username}>
    <TabComponent items={["Following", "Followers"]} currentTab={currentTab}
                  setTab={clickTab}/>
    <Following/>
  </Layout>)
};

export default following;
