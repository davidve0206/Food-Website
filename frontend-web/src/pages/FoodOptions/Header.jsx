/* React imports */
import { useContext } from 'react';
/* Context imports */
import { AuthContext } from "../../context/hooks/AuthContext"
/* Imports of utility functions and css */
import PropTypes from 'prop-types';
import API from "../../utils/api-service"
import * as ACTION_TYPES from "../../utils/action_types"

export default function Header({
  friendUsername,
  selectedView=ACTION_TYPES.CHOOSE,
  setSelectedView,
  getOptions
  }) {
 
  Header.propTypes = {
    friendUsername: PropTypes.string,
    selectedView: PropTypes.string,
    setSelectedView: PropTypes.func,
    getOptions: PropTypes.func,
  }

  const context = useContext(AuthContext)

  function handleResetClick() {
    API.resetChoices(context.tokenState, friendUsername)
    .then((resp) => alert(resp.message))
    .then(() => getOptions())
    .then(() => setSelectedView(ACTION_TYPES.CHOOSE))
  }

  return(
    <div className='foodHeader'>
      <p>What do you want to eat with <span>{friendUsername}</span> ?</p>
      {selectedView ===  ACTION_TYPES.CHOOSE ? 
        <button
          className='foodHeaderButton'
          onClick={() => setSelectedView(ACTION_TYPES.MATCHES)}
          type='button'
        >
          See Matches
        </button>
      :
        <button
          className='foodHeaderButton'
          onClick={() => setSelectedView(ACTION_TYPES.CHOOSE)}
          type='button'
        >
          See Dishes
        </button> 
      }
      <button
        className='redButton foodHeaderButton'
        onClick={handleResetClick}
        type='button'
      >
        Reset Choices
      </button>
    </div>
  )
}