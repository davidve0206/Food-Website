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

}