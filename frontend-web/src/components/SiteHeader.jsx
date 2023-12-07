import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SiteLogo from "./SiteLogo";
import "../assets/css/SiteHeader.css";

export default function SiteHeader({inclLogIn = true}) {
  
  SiteHeader.propTypes = {
    inclLogIn: PropTypes.bool
  }
  
  return (
    <div className="Header">
      <Link to="/">
        <SiteLogo />
      </Link>
      {inclLogIn && <Link to="/auth"><button>Log In</button></Link>}
    </div>
  );
}