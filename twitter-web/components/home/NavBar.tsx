import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth'

const NavBar = () => {
  let router = useRouter()
  let dispatch = useDispatch()
  const logout = async (e: any) => {
    const {logout} = authActions
    await dispatch(logout())
    await router.push("/user/login")
  }
  return (
    <>
      <nav className="col-2 d-flex flex-column display-6">
        <Link href={"/"}>
          <a
            className="d-flex align-items-center justify-content-end">
            <i className="fas fa-dove"></i></a>
        </Link>
        <Link href={"/"}>
          <a
            className="d-flex align-items-center justify-content-end">
            <i className="fas fa-home"></i>
          </a>
        </Link>
        <Link href={"/search"}>
          <a
            className="d-flex align-items-center justify-content-end">
            <i className="fas fa-search"></i>
          </a>
        </Link>
        <Link href={"/notifications"}>
          <a
            className="d-flex align-items-center justify-content-end">
            <i className="fas fa-bell"></i>
          </a>
        </Link>
        <Link href="/messages">
          <a
            className="d-flex align-items-center justify-content-end">
            <i className="fas fa-envelope"></i>
          </a>
        </Link>
        <Link href={"/profile"}>
          <a
            className="d-flex align-items-center justify-content-end">
            <i className="fas fa-user"></i>
          </a>
        </Link>
        <a onClick={logout}
           className="d-flex align-items-center justify-content-end">
          <i className="fas fa-sign-out-alt"></i>
        </a>
      </nav>
      <style jsx>{`

        h1 {
          font-size: 19px;
          font-weight: 800;
          margin: 0;

        }

        a {
          color: inherit;
          text-decoration: none;
          cursor: pointer;
        }

        a:hover {
          color: inherit;
          text-decoration: none;
        }

        nav {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          height: 100%;
        }

        nav a {
          padding: 10px;
          font-size: 30px;
          width: 55px;
          height: 55px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #212529;
        }


        nav a.blue {
          color: var(--blue);
        }

        nav a:hover {
          color: var(--blue);
          background-color: var(--buttonHoverBg);
          border-radius: 50%;
        }

        button {
          background-color: transparent;
          border: none;
          color: var(--grayButtonText);
        }

        .mainSectionContainer {
          padding: 0;
          border-left: 1px solid var(--lightGery);
          border-right: 1px solid var(--lightGery);
          display: flex;
          flex-direction: column;

        }

        .titleContainer {
          height: 53px;
          padding: 0 var(--spacing);
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--lightGery);
          flex-shrink: 0;
        }

        .titleContainer h1 {
          flex: 1;
        }

        .postFormContainer {
          display: flex;
          padding: var(--spacing);
          border-bottom: 10px solid rgb(230, 236, 240);
          flex-shrink: 0;
        }

        .post {
          display: flex;
          flex-direction: column;
          padding: var(--spacing);
          cursor: pointer;
          border-bottom: 1px solid var(--lightGery);
          flex-shrink: 0;
        }


        .mainContentContainer {
          flex: 1;
          display: flex;
        }

        .postContentContainer {
          padding-left: var(--spacing);
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .username, .date {
          color: var(--greyText);
        }

        .userImageContainer {
          width: 50px;
          height: 50px;
        }

        .userImageContainer img {
          width: 100%;
          border-radius: 50%;
          background-color: white;
        }

        .textareaContainer {
          flex: 1;
          padding-left: var(--spacing);
        }

        .textareaContainer textarea {
          width: 100%;
          border: none;
          resize: none;
          font-size: 19px;
        }


        #submitPostButton {
          background-color: var(--blue);
          color: white;
          border: none;
          border-radius: 40px;
          padding: 7px 15px;
        }

        #submitPostButton:disabled {
          background-color: var(--bludLight);
        }

        .displayName {
          font-weight: bold;
        }

        .postFooter {
          display: flex;
          align-items: center;
        }

        .postFooter .postButtonContainer {
          flex: 1;
          display: flex;
        }

        .postFooter .postButtonContainer button {
          padding: 2px 5px;
        }

        .header a:hover {
          text-decoration: underline;
        }

        .header a,
        .header span {
          padding-right: 5px;
        }

        .postButtonContainer button:hover {
          background-color: var(--buttonHoverBg);
          color: var(--blue);
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};

export default NavBar;
