export default class API {
  
  static url = "https://ec2-54-85-150-87.compute-1.amazonaws.com/"

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

  /* API call to get food options */
  static getOptions(token, friendUsername) {
    return(
      fetch( `${this.url}/food/${friendUsername}/options/`, {
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

  /* API call to send a choice on a food option */
  static makeFoodChoice(token, friendUsername, dish, action) {
    return(
      fetch( `${this.url}/food/${friendUsername}/make_choice/`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
          "dish": dish,
          "action": action
        })
      } )
      .then( resp => resp.json() )
      .catch( error => console.log(error) )
    )
  }

  /* API call to reset the user's food choices */
  static resetChoices(token, friendUsername) {
    return(
      fetch( `${this.url}/food/${friendUsername}/reset_choices/`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        }
      } )
      .then( resp => resp.json() )
      .catch( error => console.log(error) )
    )
  }

  /* API see matches for the friend pairing */
  static getMatches(token, friendUsername) {
    return(
      fetch( `${this.url}/food/${friendUsername}/matches/`, {
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
}

  