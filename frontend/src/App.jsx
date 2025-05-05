import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.scss"
import { CityCreate } from './components/CityCreate'
import { LoginForm } from './components/LoginForm'
import { AuthorizationContext, AuthorizationProvider } from './context/AuthorizationProvider'

function AuthUserRoute({children}) {
     const { user } = useContext(AuthorizationContext)
     if (!user) {
          return <Navigate to="/login" replace/>
     }
     return children
}


function App() {
     return (
          <AuthorizationProvider>
               <BrowserRouter>
                    <Routes>
                         <Route path='/login' element={<LoginForm/>}/>
                    </Routes>
                    {/* <LoginForm/> */}
               </BrowserRouter>
               {/* <CityCreate/> */}
          </AuthorizationProvider>
    
     )
}

export default App
