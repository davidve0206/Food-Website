/* React imports */
import { useContext } from "react"
/* Context imports */
import { AuthContext } from "../../context/hooks/AuthContext"
/* Component imports */
import Collapsible from '../../components/Collapsible';
/* Utilities imports */
import PropTypes from 'prop-types';
import API from "../../utils/api-service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/Icons.css"

export default function FriendRequestList({friendRequestList, getFriends}) {
  
  FriendRequestList.propTypes = {
    friendRequestList: PropTypes.array,
    getFriends: PropTypes.func,
  }

  const context = useContext(AuthContext)

  /* When a user clicks accept, the site sends the information to the API and
  gets the updated Friend and Request lists */
  function onAcceptClick(requestId, senderUsername) {
    API.acceptFriendRequest(context.tokenState, requestId, senderUsername)
    .then((resp) => alert(resp.message))
    .then(() => getFriends())
  }

  /* When a user clicks decline, the site sends the information to the API and
  gets the updated Friend and Request lists */
  function onDeclineClick(requestId, senderUsername) {
    API.declineFriendRequest(context.tokenState, requestId, senderUsername)
    .then((resp) => alert(resp.message))
    .then(() => getFriends())
  }

  /* Function that creates a list item for every username in the requestList */
  function getListItems() {
    let listItems = []
    if (friendRequestList.length > 0) {
      for (const friendRequest of friendRequestList) {
        listItems.push(
            <li key={`Request ${friendRequest.id}`}>
              {friendRequest.username}
              <FontAwesomeIcon
                icon={faRectangleXmark}
                title="Decline"
                onClick={() => onDeclineClick(friendRequest.id, friendRequest.username)}
              />
              <FontAwesomeIcon
                icon={faSquareCheck}
                title="Accept"
                onClick={() => onAcceptClick(friendRequest.id, friendRequest.username)}
              />
            </li>
        )
      }
    } else {
      listItems.push(
        <li key="empty-request-list"><small>You have no requests pending</small></li>
      )
    }
    return listItems
  }

  return(
    <Collapsible title='Friend Requests'>
      <ul className='CollapsibleList'>
        {getListItems()}
      </ul>
    </Collapsible>
  )

}