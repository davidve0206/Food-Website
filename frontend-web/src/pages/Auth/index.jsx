import { useParams } from 'react-router-dom';
import SiteHeader from "../../components/SiteHeader";

export default function Auth() {

  let { type } = useParams()

  return (
    <>
      <SiteHeader inclLogIn={false} />
      <p>Auth Form Component</p>   
    </>
  )

}