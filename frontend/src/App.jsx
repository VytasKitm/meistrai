import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.scss"
import { CityCreate } from './components/CityCreate'
import { LoginForm } from './components/LoginForm'
import { AuthorizationContext, AuthorizationProvider } from './context/AuthorizationProvider'

function PrivateRoute({children}) {
  const { user } = useContext(AuthorizationContext)
  return user ? children : <Navigate to="/login" />;
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LoginForm/>
      {/* <CityCreate/> */}
    </>
  )
}

export default App
