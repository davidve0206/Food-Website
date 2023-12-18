/* React imports */
import { useContext, useEffect, useState } from "react"
/* Context imports */
import { AuthContext } from "../../context/hooks/AuthContext"
/* Component imports */
import FriendList from "./FriendList";
import FriendRequestList from "./FriendRequestList";
import SearchUsers from "./SearchUsers";
/* Utilities imports */
import PropTypes from 'prop-types';
import API from "../../utils/api-service"
import { get_ids_and_usernames } from "../../utils/functions"

export default function LoggedInView({
  friendList,
  setFriendList,
  selectedItem,
  setSelectedItem
}) {
  
  LoggedInView.propTypes = {
    friendList: PropTypes.array,
    setFriendList: PropTypes.func.isRequired,
    selectedItem: PropTypes.number,
    setSelectedItem: PropTypes.func.isRequired,
  }

  const context = useContext(AuthContext)
  const [friendRequests, setFriendRequests] = useState([])

  /* when the component is rendered, get user's lists of friends and requests */
  useEffect(() => {
    getFriends()
  }, [])

  function getFriends() {
    API.fetchFriendList(context.tokenState)
    .then( resp => setFriendList(get_ids_and_usernames(resp, "username")) )
    .then(setSelectedItem(null))
    API.fetchFriendRequests(context.tokenState)
    .then( resp => setFriendRequests(get_ids_and_usernames(resp, "sender")) )
  }

  return (
    <>
      <div className='SideBar'>
        <SearchUsers 
          friendList={friendList}
        />
        <FriendList
          friendList={friendList}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          getFriends={getFriends}
        />
        <FriendRequestList
          friendRequestList={friendRequests}
          getFriends={getFriends}
        />
      </div>
    </>
  );
}