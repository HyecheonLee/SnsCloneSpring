import React from "react";
import Layout from '../../components/layout/Layout'
import { useSelector } from '../../store'
import { useRouter } from 'next/router'

interface IProps {
}

const index: React.FC<IProps> = ({...props}) => {
  const {user} = useSelector(state => state.auth)
  const router = useRouter()
  if (user) {
    router.replace(`/profile/${user?.username}`)
  }
  return (<Layout title={user?.username}>
    profile
  </Layout>);
};

export default index;
