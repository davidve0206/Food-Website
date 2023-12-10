import { useParams } from "react-router-dom";
import * as ACTION_TYPES from "../../utils/action_types"
import CreateUserForm from "./CreateUserForm";
import LogInForm from "./LogInForm"
import SiteHeader from "../../components/SiteHeader";

export default function Auth() {

  let { type } = useParams()

  return (
    <>
      <SiteHeader inclLogIn={false} />
      {type == ACTION_TYPES.SINGIN ? <CreateUserForm /> : <LogInForm />}

    </>
  )

}