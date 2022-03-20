import { debounce } from "lodash";
import React, { useState } from "react";

interface IProps {
  setKeyword: Function
}

const SearchBar: React.FC<IProps> = ({...props}) => {
  const [keyWord, setKeyWord] = useState("");
  const debouncedSearch = React.useCallback(
    debounce((keyword: string) => {
      props.setKeyword(keyword)
    }, 500),
    []
  )

  const handleChange = React.useCallback(
    e => {
      setKeyWord(e.target.value)
      debouncedSearch(e.target.value)
    },
    [debouncedSearch]
  )

  return (<>
    <div className="input-group my-3">
      <span className="input-group-text" id="basic-addon1">
        <i className={" fa fas fa-search"}/>
      </span>
      <input type="text" className="form-control" placeholder="검색해주세요..."
             value={keyWord}
             aria-describedby="basic-addon1" onChange={handleChange}/>
    </div>
  </>);
};

export default SearchBar;
