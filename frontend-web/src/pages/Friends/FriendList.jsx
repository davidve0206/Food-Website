/* React imports */
import { useContext } from 'react';
/* Import for Navigation */
import { useNavigate } from "react-router-dom"
/* Context imports */
import { AuthContext } from "../../context/hooks/AuthContext"
/* Component imports */
import Collapsible from '../../components/Collapsible';
/* Utilities imports */
import PropTypes from 'prop-types';
import API from "../../utils/api-service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

export default function FriendList({
  friendList=[],
  selectedItem,
  setSelectedItem,
  getFriends
}) {
  
  FriendList.propTypes = {
    friendList: PropTypes.array,
    selectedItem: PropTypes.number,
    setSelectedItem: PropTypes.func,
    getFriends: PropTypes.func,
  }

  const context = useContext(AuthContext)
  const navigate = useNavigate()
  
  /* If a friend is clicked, make its index the selectedItem and its username the SelectedFriend */
  function handleFriendClick(friend, id) {
    setSelectedItem(id)
    navigate(`friends/${friend}`)
  }

  /* When a user clicks remove, the site sends the information to the API and
  gets the updated Friend and Request lists */
  function onRemoveClick(friendUsername) {
    API.removeFriend(context.tokenState, friendUsername)
    .then((resp) => alert(resp.message))
    .then(() => getFriends())
    .then(() => navigate("/loggedin"))
  }

  /* Function that creates a list item for every username in the friendList; with the selectedItem highlighted */
  function getListItems() {
    let listItems = []
    if (friendList.length > 0) {
      for (const friend of friendList) {
        listItems.push(
          <li key={`Friend ${friend.id}`}
          className={`ClickableListItem ${friend.id === selectedItem ? "Selected" : ""}`}
          onClick={() => handleFriendClick(friend.username, friend.id)}
          >
            {friend.username}
            <FontAwesomeIcon
              icon={faRectangleXmark}
              title="Remove"
              onClick={() => onRemoveClick(friend.username)}
            />
          </li>
        )
      }
    } else {
      listItems.push(
        <li key="empty-request-list"><small>Add your friends using the search bar</small></li>
      )
    }
    return listItems
  }

  return(
    <Collapsible title='Friends'>
      <ul className='CollapsibleList'>
        {getListItems()}
      </ul>
    </Collapsible>
  )

}