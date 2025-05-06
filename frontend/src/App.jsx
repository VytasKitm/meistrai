import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.scss"
import './App.css'
import { CityCreate } from './components/CityCreate'
import { LoginForm } from './components/LoginForm'
import { AuthorizationContext, AuthorizationProvider } from './context/AuthorizationProvider'
import { NavbarComp } from './components/NavbarComp'
import { Layout } from './components/Layout'
import { Homepage } from './pages/homepage/Homepage'


function AuthUserRoute({children}) {
     const { user } = useContext(AuthorizationContext)
     console.log("authUserRoute: ", user)
     if (!user) {
          return <Navigate to="/login" replace/>
     }
     return children
}


function App() {
     	return (
	
		<BrowserRouter>
		
          		<AuthorizationProvider>
                    	<Routes>
                         	<Route path='/login' element={<LoginForm/>}/>
					<Route path='/' element={<AuthUserRoute><Layout/></AuthUserRoute>}>
						<Route index element={<Homepage/>} />

					
					</Route>
                    	</Routes>
                    	{/* <LoginForm/> */}
          		</AuthorizationProvider>
               	{/* <CityCreate/> */}
            </BrowserRouter>
    
     )
}

export default App
