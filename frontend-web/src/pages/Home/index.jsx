import { Link } from 'react-router-dom';
import SiteHeader from "../../components/SiteHeader";
import Reviews from './Reviews';
import "../../assets/css/Home.css"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <div className='CoreContainer'>
        <div className='Welcome'>
          <h1>Can't agree on what to eat tonight?</h1>
          <Link to="/auth/signin">
            <button>Sign In</button>
          </Link>
        </div>
        <Reviews />
      </div>
    </>
  );
}