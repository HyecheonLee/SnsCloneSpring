import '@fortawesome/fontawesome-free/css/all.css'
import '../styles/globals.css'
import "../styles/applications.scss"
import type { AppProps } from 'next/app'
import { wrapper } from '../store'
import Auth from '../components/Auth'
import { useRouter } from 'next/router'
import LoadingModal from '../components/modal/LoadingModal'
import LiveEvent from '../components/notify/LiveEvent'

function MyApp({Component, pageProps}: AppProps) {
  let router = useRouter()
  let pathname = router.pathname
  let useAuth = process.env.NEXT_PUBLIC_USE_AUTH

  if (pathname === "/user/login" || pathname === "/user/register" || !useAuth) {
    return <>
      <Component {...pageProps} />
      <LoadingModal/>
    </>
  }
  return <Auth>
    <LiveEvent>
      <Component {...pageProps} />
      <LoadingModal/>
    </LiveEvent>
  </Auth>
}

export default wrapper.withRedux(MyApp)
