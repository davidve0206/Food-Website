import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import API from "../../utils/api-service"
import "../../assets/css/Forms.css"

export default function CreateUserForm() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  function onSubmit(data) {
    API.registerUser(data)
    .then(resp => {
      if (resp.id) {
        alert(`User ${resp.username} created, please log in`)
        navigate("/auth")
      } else {
        resp.username ? alert(`${resp.username}`) : alert("Something went wrong")
      }
    })
  }

  return(
    <div className="CoreContainer">
      <form className="UserForm" onSubmit={handleSubmit(onSubmit)}>

        <h1>Want to find the perfect match for tonight's dinner?</h1>
        <h2>Sign up here</h2>
      
        <label htmlFor="email">Email:</label>
        <input type="email" {...register("email", { required: "Email is required" })} />
        {errors.email && <span className="FormAlert" role="alert">{errors.email.message}</span>}
        
        <label htmlFor="username">Username:</label>  
        <input {...register("username", { required: "Username is required" })} />
        {errors.username && <span className="FormAlert" role="alert">{errors.username.message}</span>}

        <label htmlFor="password">Password:</label>  
        <input type="password" {...register("password", { required: "Password is required", minLength: 5})} />
        {errors?.password?.type === "required" && <span className="FormAlert" role="alert">{errors.password.message}</span>}
        {errors?.password?.type === "minLength" && <span className="FormAlert" role="alert">Password is too short</span>}
        
        <label htmlFor="first_name">First name:</label>  
        <input {...register("first_name", { required: "Name is required" })} />
        {errors.first_name && <span className="FormAlert" role="alert">{errors.first_name.message}</span>}

        <label htmlFor="last_name">Last name:</label>  
        <input {...register("last_name", { required: "Last name is required" })} />
        {errors.last_name && <span className="FormAlert" role="alert">{errors.last_name.message}</span>}

        <button>Sign In</button>
      </form>
    </div>
    
  );
}