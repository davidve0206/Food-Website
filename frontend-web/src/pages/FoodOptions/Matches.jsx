/* Imports for the auth context */
import { useState, useContext, useEffect } from "react"
/* Context imports */
import { AuthContext } from "../../context/hooks/AuthContext"
/* Imports of utility functions and css */
import PropTypes from 'prop-types';
import API from "../../utils/api-service"

export default function Matches({friendUsername}) {
  
  Matches.propTypes = {
    friendUsername: PropTypes.string
  }

  useEffect(() => {
    getMatches()
  }, [])

  function getMatches() {
    API.getMatches(context.tokenState, friendUsername)
    .then( resp => setMatchesArray(resp) )
  }

  const context = useContext(AuthContext)
  const [matchesArray, setMatchesArray] = useState([])

  function getMatchesDivs() {
    let returnArray = []
    for (const match of matchesArray) {
      returnArray.push(
        <div
          className="MatchContainer"
          key={match.dish}
        >
          <h3>{match.dish}</h3>
          <img src={match.image} />
        </div>
      )
    }
    return returnArray
  }
  
  return(
    <div className="MatchesContainer">
      {getMatchesDivs()}
    </div>
  )
}