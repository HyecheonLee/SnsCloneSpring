import React, { FunctionComponent } from "react";
import Layout from '../../components/layout/Layout'
import SearchContainer from '../../components/search/SearchContainer'

interface IProps {
}

const SearchIndex: React.FC<IProps> = ({...props}) => {
  return (<>
    <Layout title={"Search"}>
      <SearchContainer/>
    </Layout>
  </>);
};

export default SearchIndex;
