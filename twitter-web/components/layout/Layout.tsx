import React from "react";
import NavBar from './NavBar'
import ReplyModal from '../reply/ReplyModal'

interface IProps {
  title?: string
}

const Layout: React.FC<IProps> = ({...props}) => {
  return (<>
    <div className="container-fluid">
      <div>
        <div className="row">
          <NavBar/>
          <div
            className="col-10 col-md-10 col-lg-8 p-0 border-start border-end position-relative">
            <div className="px-3">
              <h6 className={"text-black-50 display-6 fw-bold"}>{props.title}</h6>
            </div>
            <hr className={"mb-0"}/>
            {props.children}
          </div>
        </div>
      </div>
    </div>
    <ReplyModal/>
  </>);
};
Layout.defaultProps = {
  title: "Index"
}

export default Layout;
