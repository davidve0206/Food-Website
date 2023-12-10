import { useContext } from "react"
import { AuthContext } from "../../context/hooks/AuthContext"
import SiteHeader from "../../components/SiteHeader";

export default function Friends() {
  
  const context = useContext(AuthContext)
  const local = JSON.parse(localStorage.getItem("authState"))

  return (
    <>
      <SiteHeader />
      <div className='CoreContainer'>
        <p>{context.authState}</p>
        <p>{context.usernameState}</p>
        <p>{context.tokenState}</p>
        <p>local {local.username}</p>
      </div>
    </>
  );
}