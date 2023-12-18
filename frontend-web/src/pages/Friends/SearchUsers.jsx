/* React imports */
import { useContext, useState, useEffect } from 'react';
/* Context imports */
import { AuthContext } from "../../context/hooks/AuthContext"
/* Utilities imports */
import PropTypes from 'prop-types';
import API from "../../utils/api-service"
import { get_usernames } from "../../utils/functions"
import "../../assets/css/Forms.css"


export default function SearchUsers({friendList}) {

  SearchUsers.propTypes = {
    friendList: PropTypes.array,
  }

  const context = useContext(AuthContext)
  const [userList, setUserList] = useState([]);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  /* when the component is rendered, get a list of all usernames */
  useEffect(() => {
    getUsers()
  }, [])

  function getUsers() {
    API.fetchAllUsers(context.tokenState)
    .then( resp => setUserList(get_usernames(resp, "username")) )
  }

  /* When the user inputs something, update the results
  emptying the results if he deletes his query */
  function handleChange(value) {
    setInput(value)
    let searchResult = userList.filter((username) => username.toLowerCase().includes(value))
    setResults(value === "" ? [] : searchResult)
  }

  /* When the user clicks on a result, send a friend request
  if the user is not already on the friend's list */
  function handleResultClick(targetUsername) {
    let index = friendList.findIndex((friend) => friend.username === targetUsername)
    if (targetUsername === context.usernameState) {
      alert("You can't friend yourself")
    } else {
      if (index === -1) {
        API.sendFriendRequest(context.tokenState, context.usernameState, targetUsername)
        .then(alert("Friend request sent"))
      } else {
        alert(`${targetUsername} is already a friend`)
      }
    }
  }

  function SearchResults(results) {
    let resultList = []
    if (results.length > 0) {
      for (const [index, result] of results.entries()) {
        resultList.push(
          <li
            key={index}
            title="Send Request"
            onClick={() => handleResultClick(result)}
          >
            {result}
          </li>
        )
      }
    }
    return resultList;
  }

  return(
    <>
      <input
        className="UserSearchBar"
        name="UserSearchBar"
        placeholder="Add new friends"
        value={input}
        onChange={(event) => handleChange(event.target.value)}
      />
      {results.length > 0 && <ul className='SearchResultList'>{SearchResults(results)}</ul>}
    </>
  )
}