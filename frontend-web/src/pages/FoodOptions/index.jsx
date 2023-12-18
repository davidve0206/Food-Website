/* Import for Navigation */
import { useParams, useOutletContext } from "react-router-dom";
/* React Imports */
import { useState, useEffect, useContext } from "react"
/* Context imports */
import { AuthContext } from "../../context/hooks/AuthContext"
/* Component imports */
import Header from "./Header";
import Options from "./Options";
import Matches from "./Matches";
/* Imports of utility functions and css */
import * as ACTION_TYPES from "../../utils/action_types"
import API from "../../utils/api-service"
import { get_usernames } from "../../utils/functions"
import "../../assets/css/FoodOptions.css"

export default function FoodOptions() {
  
  const { username: friendUsername } = useParams()
  const context = useContext(AuthContext)
  const [friendList] = useOutletContext()
  const [selectedView, setSelectedView] = useState(ACTION_TYPES.CHOOSE)
  const [optionsArray, setOptionsArray] = useState()

  useEffect(() => {
    getOptions()
  }, [])

  function getOptions() {
    API.getOptions(context.tokenState, friendUsername)
    .then( resp => setOptionsArray(resp) )
  }

  /* Return the view */
  if (get_usernames(friendList, "username").includes(friendUsername)) {
    return (
      <>
        <div>
          <Header
            friendUsername={friendUsername}
            selectedView={selectedView}
            setSelectedView={setSelectedView}
            getOptions={getOptions}
          />
          { selectedView === ACTION_TYPES.CHOOSE && <Options
                                                      friendUsername={friendUsername}
                                                      optionsArray={optionsArray}
                                                    />}
          { selectedView === ACTION_TYPES.MATCHES && <Matches friendUsername={friendUsername}/>}
        </div>
      </>
    );
  } else {
    return (
      <div className="foodHeader">
        <p><span>{friendUsername}</span> is not in your Friends list</p>
      </div>
    )
  }
  
}