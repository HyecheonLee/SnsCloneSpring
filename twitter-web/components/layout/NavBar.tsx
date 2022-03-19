import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth'
import { apiV1User } from '../../utils/apiUtils'

const NavBar = () => {
  let router = useRouter()
  let dispatch = useDispatch()
  const logout = async (e: any) => {
    const {logout} = authActions
    await apiV1User.delete("/me")
    await router.push("/user/login")
    await dispatch(logout())
    await router.reload()
  }

  return (
    <div className="vh-100 col-2 position-sticky top-0 border-end">
      <nav
        className="d-flex flex-column display-6 text-muted justify-content-center">
        <Link href={"/"}>
          <a
            className="btn rounded-circle d-flex align-items-center justify-content-end">
            <i className="fas fa-dove"/>
          </a>
        </Link>
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
            className="btn rounded-circle d-flex align-items-center justify-content-end">
            <i className="fas fa-bell"/>
          </a>
        </Link>
        <Link href="/messages">
          <a
            className="btn rounded-circle d-flex align-items-center justify-content-end">
            <i className="fas fa-envelope"/>
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
