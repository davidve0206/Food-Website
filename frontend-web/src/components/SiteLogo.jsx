import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/SiteLogo.css"

export default function SiteLogo() {
  return (
    <h1 className='SiteLogo'>
      <FontAwesomeIcon icon={faCookieBite} />BitePal
    </h1>
  )
}