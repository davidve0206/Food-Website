import { Link } from 'react-router-dom';
import SiteHeader from "../../components/SiteHeader";
import Reviews from './Reviews';
import * as ACTION_TYPES from "../../utils/action_types"
import "../../assets/css/Home.css"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <div className='CoreContainer'>
        <div className='Welcome'>
          <h1>Can't agree on what to eat tonight?</h1>
          <Link to={`/auth/${ACTION_TYPES.SINGUP}`}>
            <button>Sign Up</button>
          </Link>
        </div>
        <Reviews />
      </div>
    </>
  );
}