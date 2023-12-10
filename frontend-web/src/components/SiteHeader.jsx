/* Imports to use context for log-out */
import { useContext } from "react"
import { AuthContext } from "../context/hooks/AuthContext"

/* Imports to use router */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Imports for rendering */
import SiteLogo from "./SiteLogo";
import "../assets/css/SiteHeader.css";

export default function SiteHeader({inclLogIn = true, inclLogOut = false}) {
  
  SiteHeader.propTypes = {
    inclLogIn: PropTypes.bool,
    inclLogOut: PropTypes.bool
  }

  const context = useContext(AuthContext)
  
  return (
    <div className="Header">
      <Link to="/">
        <SiteLogo />
      </Link>
      {inclLogIn && <Link to="/auth">
        <button>Log In</button>
      </Link>}
      {inclLogOut && <Link to="/auth">
        <button className='redButton' onClick={() => context.handleUserLogout()}>Log Out</button>
      </Link>}
    </div>
  );
}