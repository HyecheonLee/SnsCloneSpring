import '@fortawesome/fontawesome-free/css/all.css'
import '../styles/globals.css'
import "../styles/applications.scss"
import type { AppProps } from 'next/app'
import { wrapper } from '../store'
import Auth from '../components/Auth'
import { useRouter } from 'next/router'
import LoadingModal from '../components/LoadingModal'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

function MyApp({Component, pageProps}: AppProps) {
  let router = useRouter()
  let pathname = router.pathname
  let useAuth = process.env.NEXT_PUBLIC_USE_AUTH
  dayjs.extend(relativeTime);

  if (pathname === "/user/login" || pathname === "/user/register" || !useAuth) {
    return <>
      <Component {...pageProps} />
      <LoadingModal/>
    </>
  }
  return <Auth>
    <Component {...pageProps} />
    <LoadingModal/>
  </Auth>
}

export default wrapper.withRedux(MyApp)
