import React from "react";
import Layout from '../../components/layout/Layout'
import { useRouter } from 'next/router'
import ProfileContainer from '../../components/profile/ProfileContainer'

interface IProps {
}

const index: React.FC<IProps> = ({...props}) => {
  const router = useRouter()
  const username = router.query.username as string
  return (<Layout title={username}>
    <ProfileContainer/>
  </Layout>);
};

export default index;
