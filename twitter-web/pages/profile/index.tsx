import React from "react";
import Layout from '../../components/layout/Layout'
import { useSelector } from '../../store'

interface IProps {
}

const index: React.FC<IProps> = ({...props}) => {
  const {user} = useSelector(state => state.auth)
  return (<Layout title={user?.username}>
    profile
  </Layout>);
};

export default index;
