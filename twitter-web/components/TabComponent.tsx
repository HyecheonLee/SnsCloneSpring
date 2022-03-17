import React from "react";

interface IProps {
  items: string[],
  currentTab: string,
  setTab: Function
}

const TabComponent: React.FC<IProps> = ({...props}) => {
  const {items, currentTab, setTab} = props
  return (<>
    <ul>
      {items.map(item => {
        return <li key={`tab_${item}`}
                   className={`p-3 ${currentTab === item && "active"}`}
                   onClick={setTab(item)}>
          <a className={"fw-bold text-muted"}>{item}</a>
        </li>
      })}
    </ul>
    <style jsx>{`
      ul {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0;
      }

      li {
        box-sizing: border-box;
        flex: 1;
        text-align: center;
        cursor: pointer;
        border-bottom: 2px solid #dee2e6;
      }

      li a {
        text-decoration: none;
        padding: 3px;
      }

      li:hover {
        background: #9BD1F9;
      }

      li.active {
        border-bottom: 3px solid #1fa2f1 !important;
      }

      li.active a {
        color: #1fa2f1 !important;
      }

    `}</style>
  </>);
};

export default TabComponent;
