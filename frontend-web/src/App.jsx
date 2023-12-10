import { useReducer } from 'react'

/* Imports for the route provider */
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

/* Imports for the authorization context provider */
import { AuthContext } from "./context/hooks/AuthContext"
import * as ACTIONS from "./context/actions/auth_actions"
import * as AuthReducer from "./context/reducers/AuthReducer"

/* Imports for the pages */
import Home from './pages/Home'
import Auth from './pages/Auth'
import Friends from "./pages/Friends"

/* Set routes within the app */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/:type?",
    element: <Auth />,
  },
  {
    path: "/friends",
    element: <Friends />,
  },
]);

export default function App() {
  /* Set reducer and handler functions for context manager */
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer, AuthReducer.initialState)
  
  function handleLogin(data) {
    dispatchAuthReducer(ACTIONS.login(data))
  }

  function handleLogout() {
    dispatchAuthReducer(ACTIONS.logout())
  }

  return(
    <AuthContext.Provider
      value={{
        authState: stateAuthReducer.isAuth,
        usernameState: stateAuthReducer.username,
        tokenState: stateAuthReducer.token,
        handleUserLogin: (data) => handleLogin(data),
        handleUserLogout: () => handleLogout(),
      }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}