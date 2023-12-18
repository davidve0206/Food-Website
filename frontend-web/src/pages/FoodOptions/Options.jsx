/* Imports for the auth context */
import { useState, useContext } from "react"
/* Context imports */
import { AuthContext } from "../../context/hooks/AuthContext"
/* Imports of utility functions and css */
import PropTypes from 'prop-types';
import API from "../../utils/api-service"
import * as ACTION_TYPES from "../../utils/action_types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/Icons.css"

export default function Options({friendUsername, optionsArray=[]}) {

  Options.propTypes = {
    friendUsername: PropTypes.string,
    optionsArray: PropTypes.array
  }

  const context = useContext(AuthContext)
  const [optionIndex, setOptionIndex] = useState(0)

  function handleChoiceClick(dish, action) {
    API.makeFoodChoice(
      context.tokenState,
      friendUsername,
      dish,
      action
    )
    .then(setOptionIndex(i => i + 1))
  }

  if ( optionsArray.length > 0 &&
    optionIndex < optionsArray.length
  ) {
    let option = optionsArray[optionIndex]
    return(
      <div className="OptionContainer">
        <h2>{option.dish}</h2>
        <img src={option.image} />
        <div className="OptionButtons">
          <FontAwesomeIcon
            icon={faCircleXmark}
            title="Dislike"
            onClick={() =>
              handleChoiceClick(option.dish, ACTION_TYPES.DISLIKE)}
          />
          <FontAwesomeIcon
            icon={faCircleCheck}
            title="Like"
            onClick={() =>
              handleChoiceClick(option.dish, ACTION_TYPES.LIKE)}
          />
        </div>
      </div>
    )
  } else {
    return(
      <p>There are no options left for you;
        if you want to change your decisions use reset choices.</p>
    )
  }
}