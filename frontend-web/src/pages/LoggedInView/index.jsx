/* Import for Navigation */
import { useNavigate, Outlet } from "react-router-dom"
/* Imports for the auth context */
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/hooks/AuthContext"
/* Component imports */
import SiteHeader from "../../components/SiteHeader";
import Friends from "../Friends"
/* Imports of utility functions and css */
import "../../assets/css/LoggedInView.css"

export default function LoggedInView() {
  
  /* Users that haven't logged in should be auto-directed to Log In
  This effect should only happen in changes to the AuthState */

  const context = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    !context.authState && navigate("/auth")
  }, [context.authState, navigate])
  
  /* The view can hold a state for a selected friend, to be used by both
  sub-componennts */
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [friendList, setFriendList] = useState([])

  /* Return the view */
  return (
    <>
      <SiteHeader inclLogIn={false} inclLogOut={true} />
      <div className="WithSideBar">
        <Friends
          friendList={friendList}
          setFriendList={setFriendList}
          selectedItem={selectedFriend}
          setSelectedItem={setSelectedFriend}
        />
        <div className="CoreContainer">
          <Outlet context={[friendList]}/>
        </div>
      </div>
    </>
  );
}