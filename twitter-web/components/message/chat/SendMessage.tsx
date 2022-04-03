import React, { FunctionComponent } from "react";

interface IProps {
}

const SendMessage: React.FC<IProps> = ({...props}) => {
  return (<>
    <div className="p-3 d-flex flex-shrink-0">
      <textarea className="flex-grow-1 rounded-pill border-0"
                placeholder="메시지를 입력해 주세요."
                style={{
                  resize: "none",
                  height: "38px",
                  padding: "8px 13px",
                  background: "rgba(0,0,0,0.05)"
                }}/>
      <button className="text-primary fs-4">
        <i className="fas fa-paper-plane"/>
      </button>
    </div>
  </>);
};

export default SendMessage;
