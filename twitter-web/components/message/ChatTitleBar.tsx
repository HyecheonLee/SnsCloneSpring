import React, { useState } from "react";
import { debounce } from 'lodash'
import { searchUser } from '../../apis/userApis'
import { UserType } from '../../types/user'
import { useSelector } from '../../store'
import UserProfile from '../user/UserProfile'

interface IProps {
  selected: UserType[],
  setSelected: Function
}

const ChatTitleBar: React.FC<IProps> = ({...props}) => {
    const auth = useSelector(state => state.auth)
    const [keyWord, setKeyWord] = useState("");
    const [users, setUsers] = useState<UserType[]>([]);
    const {selected, setSelected} = props

    const debouncedSearch = debounce(async (keyword: string) => {
      if (keyword.length === 0) {
        return;
      }
      const result = await searchUser(keyword);
      const filteredUser = result.filter(user => user.id !== auth.user?.id)
        .filter(user => {
          return !selected.some(value => value.id === user.id)
        });
      setUsers(filteredUser);
    }, 500)

    const handleChange = React.useCallback(e => {
      setKeyWord(e.target.value)
      if (e.target.value.length === 0) {
        setUsers([]);
      } else {
        debouncedSearch(e.target.value)
      }
    }, [debouncedSearch])
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Backspace" && keyWord.length === 0) {
        selectedHandler(selected.slice(0, selected.length - 1))
      }
    }

    const onClickHandler = (user: UserType) => (e: React.MouseEvent<HTMLDivElement>) => {
      selectedHandler([...selected, user])
      setUsers(users.filter(value => value.id !== user.id));
    }
    const selectedHandler = (selected: UserType[]) => {
      setSelected(selected);
    }

    return (<>
        <div className="d-flex align-items-center flex-wrap" style={{minHeight: "60px"}}>
          <span className="ms-3 text-black-50">To : </span>
          {selected.map(value => {
            return <span key={`selected_${value.id}`}
                         className="mx-1 p-2 alert-primary rounded-2">{value.username}</span>
          })}
          <input type="text"
                 className="border-0 flex-grow-1 fw-bold text-black-50 m-3"
                 style={{minWidth: "350px"}}
                 placeholder="이름으로 검색" value={keyWord} onChange={handleChange}
                 onKeyDown={handleKeyDown}
          />
        </div>
        <hr className="m-0 p-0"/>
        <div>
          {users.map(user => {
            return <UserProfile user={user} key={user.id} onClick={onClickHandler(user)}/>
          })}
        </div>
      </>
    );
  }
;

export default ChatTitleBar;
