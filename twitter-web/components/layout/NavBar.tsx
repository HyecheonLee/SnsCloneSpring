import React, { useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth'
import { apiV1User } from '../../utils/apiUtils'
import { useSelector } from '../../store'
import { updateNotifyCount } from '../../apis/notifyApi'
import { chatActions } from '../../store/chat'
import { fetchChatRooms } from '../../apis/chatApi'

const NavBar = () => {
  let router = useRouter()
  const {notify, chat} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    updateNotifyCount(dispatch)
    fetchChatRooms().then(value => {
      dispatch(chatActions.fetchChats(value))
    });
  }, []);

  const logout = async (e: any) => {
    const {logout} = authActions
    await apiV1User.delete("/me")
    await router.push("/user/login")
    await dispatch(logout())
    await router.reload()
  }

  return (
    <div className="vh-100 col-2 position-sticky top-0">
      <nav
        className="d-flex flex-column display-6 text-muted justify-content-center">
        <div
          className="rounded-circle d-flex align-items-center justify-content-end text-primary">
          <i className="fas fa-dog"/>
        </div>
        <Link href={"/"}>
          <a
            className="btn rounded-circle d-flex align-items-center justify-content-end">
            <i className="fas fa-home"/>
          </a>
        </Link>
        <Link href={"/search"}>
          <a
            className="btn rounded-circle d-flex align-items-center justify-content-end">
            <i className="fas fa-search"/>
          </a>
        </Link>
        <Link href={"/notifications"}>
          <a
            className="btn rounded-circle d-flex align-items-center justify-content-end position-relative">
            <i className="fas fa-bell"/>
            {notify.count > 0 &&
            <span style={{top: "12px", left: "42px", fontSize: "10px"}}
                  className="position-absolute translate-middle badge rounded-circle bg-danger">{notify.count}</span>
            }
          </a>
        </Link>
        <Link href="/messages">
          <a
            className="btn rounded-circle d-flex align-items-center justify-content-end position-relative">
            <i className="fas fa-envelope"/>
            {chat.unCheckedCnt > 0 &&
            <span style={{top: "12px", left: "42px", fontSize: "10px"}}
                  className="position-absolute translate-middle badge rounded-circle bg-danger">{chat.unCheckedCnt}</span>
            }
          </a>
        </Link>
        <Link href={"/profile"}>
          <a
            className="btn rounded-circle d-flex align-items-center justify-content-end">
            <i className="fas fa-user"/>
          </a>
        </Link>
        <a onClick={logout}
           className="btn rounded-circle d-flex align-items-center justify-content-end">
          <i className="fas fa-sign-out-alt"/>
        </a>
      </nav>
      <style jsx>{`

        a {
          color: inherit;
        }

        nav a {
          padding: 10px;
          font-size: 30px;
          width: 55px;
          height: 55px;
        }

        nav div {
          padding: 10px;
          font-size: 30px;
          width: 55px;
          height: 55px;
        }


        nav a.blue {
          color: var(--blue);
        }

        nav a:hover {
          color: var(--blue);
          background-color: var(--buttonHoverBg);
        }

      `}</style>
    </div>
  );
};

export default NavBar;
