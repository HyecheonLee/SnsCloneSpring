import type { NextPage } from 'next'
import Link from 'next/link'
import NavBar from '../components/home/NavBar'
import MainSectionContainer from '../components/home/MainSectionContainer'


const Home: NextPage = () => {
  return (
    <div className="container">
      <div>
        <div className="row">
          <NavBar/>
          <MainSectionContainer/>
          <div className={"d-none d-md-block col-md-2 col-lg-4"}>
            <span>third column</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
