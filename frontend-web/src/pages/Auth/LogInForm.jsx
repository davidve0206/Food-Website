import { useContext } from "react"
import { AuthContext } from "../../context/hooks/AuthContext"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import API from "../../utils/api-service"
import "../../assets/css/Forms.css"

export default function CreateUserForm() {
  
  const context = useContext(AuthContext)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  function onSubmit(data) {
    API.logUserIn(data)
    .then(resp => {
      if (resp.token) {
        context.handleUserLogin({username: data.username, token: resp.token})
        navigate("/friends")
      } else {
      alert("Something went wrong")
      }
    })
  }

  return(
    <div className="CoreContainer">
      <form className="UserForm" onSubmit={handleSubmit(onSubmit)}>

        <h1>Welcome back!</h1>
        <h2>Log In here</h2>
        
        <label htmlFor="username">Username:</label>  
        <input {...register("username", { required: "Username is required" })} />
        {errors.username && <span className="FormAlert" role="alert">{errors.username.message}</span>}

        <label htmlFor="password">Password:</label>  
        <input type="password" {...register("password", { required: "Password is required"})} />
        {errors?.password?.type === "required" && <span className="FormAlert" role="alert">{errors.password.message}</span>}

        <button>Log In</button>
      </form>
    </div>
    
  );
}