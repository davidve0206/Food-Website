export default class API {
  
  static url = "http://127.0.0.1:8000"

  /* API calls to create and log users in */

  static logUserIn(body) {
    return(
      fetch( `${this.url}/auth/`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      } )
      .then( resp => resp.json() )
      .catch( error => console.log(error) )
    )
  }
  
  static registerUser(body) {
    return(
      fetch( `${this.url}/users/new/`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      } )
      .then( resp => resp.json() )
      .catch( error => console.log(error) )
    )
  }

  /* API call to get all users */
  static fetchAllUsers(token) {
    return( 
      fetch( `${this.url}/users/all/`, {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        }
      } )
      .then( resp => resp.json() )
      .catch( error => console.log(error) )
    )
  }

  /* API call to get user the authenticated user's friend lists */
  static fetchFriendList(token) {
    return(
      fetch( `${this.url}/users/friends/`, {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        }
      } )
      .then( resp => resp.json() )
      .catch( error => console.log(error) )
    )
  }
  
  /* API call to make a friend request */
  static sendFriendRequest(token, user, target) {
    return(
      fetch( `${this.url}/users/friend_requests/`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
          "sender": user,
          "receiver": target
        })
      } )
      .then( resp => resp.json() )
      .catch( error => console.log(error) )
    )
  }

  /* API call to remove a person from the friend list */
  static removeFriend(token, friendUsername) {
    return(
      fetch( `${this.url}/users/friends/${friendUsername}/unfriend/`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      } )
      .then( resp => resp.json() )
      .catch( error => console.log(error) )
    )
  }
  
  /* API call to get friend requests for the authenticated user */
  static fetchFriendRequests(token) {
    return(
      fetch( `${this.url}/users/friend_requests/`, {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        }
      } )
      .then( resp => resp.json() )
      .catch( error => console.log(error) )
    )
  }

  /* API call to accept a friend request */
  static acceptFriendRequest(token, requestId, senderUsername) {
    return(
      fetch( `${this.url}/users/friend_requests/${requestId}/resolve/`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
          "sender": senderUsername,
          "action": "accept"
        })
      } )
      .then( resp => resp.json() )
      .catch( error => console.log(error) )
    )
  }

    /* API call to decline a friend request */
    static declineFriendRequest(token, requestId, senderUsername) {
      return(
        fetch( `${this.url}/users/friend_requests/${requestId}/resolve/`, {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          },
          body: JSON.stringify({
            "sender": senderUsername,
            "action": "decline"
          })
        } )
        .then( resp => resp.json() )
        .catch( error => console.log(error) )
      )
    }

}