import type { NextPage } from 'next'
import MainSectionContainer from '../components/home/MainSectionContainer'
import Layout from '../components/layout/Layout'
import React from 'react'


const Home: NextPage = () => {
  return (
    <Layout title={"Home"}>
      <MainSectionContainer/>
    </Layout>
  )
}

export default Home
