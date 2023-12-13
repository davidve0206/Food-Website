/* Import for Navigation */
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
/* Imports for the auth context */
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/hooks/AuthContext"
/* Component imports */

/* Imports of utility functions and css */
import PropTypes from 'prop-types';


export default function FoodOptions({ selectedFriend = null }) {
  
  FoodOptions.propTypes = {
    selectedFriend: PropTypes.string,
  }

  /* Return the view */
  return (
    <>
      <div className='CoreContainer'>
        <p>Content will go here</p>
        <p>You have selected {selectedFriend}</p>
      </div>
    </>
  );
}