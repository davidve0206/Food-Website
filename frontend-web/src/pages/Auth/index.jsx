/* Import for Navigation */
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
/* Imports for the auth context */
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/hooks/AuthContext"
/* Component imports */
import CreateUserForm from "./CreateUserForm";
import LogInForm from "./LogInForm"
import SiteHeader from "../../components/SiteHeader";
/* Imports of utility functions */
import * as ACTION_TYPES from "../../utils/action_types"

export default function Auth() {

  const context = useContext(AuthContext)
  const navigate = useNavigate()

  let { type } = useParams()
  
  // Logged-in users should be auto-redirected to the main site (LoggedInView)
  useEffect(() => {
    context.authState && navigate("/loggedin")
  }, [context.authState, navigate])
  

  return (
    <>
      <SiteHeader inclLogIn={false} />
      {type == ACTION_TYPES.SINGIN ? <CreateUserForm /> : <LogInForm />}
    </>
  )

}