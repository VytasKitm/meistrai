import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.scss"
import './App.css'

import { Login } from './pages/login/Login'
import { AuthorizationContext, AuthorizationProvider } from './context/AuthorizationProvider'
import { Layout } from './components/Layout'
import { Homepage } from './pages/homepage/Homepage'
import { Admin } from './pages/admin/Admin'
import { Favorites } from './pages/favorites/Favorites'
import { Mechanics } from './pages/mechanics/Mechanics'
import { Filters } from './pages/filters/Filters'



function AuthUserRoute({children}) {
     const { user } = useContext(AuthorizationContext)
     console.log("authUserRoute: ", user)
     if (!user) {
          return <Navigate to="/login" replace/>
     }
     return children
}

function AuthAdminRoute({children}) {
	const {user} = useContext(AuthorizationContext)
	console.log("authadminRoute:", user)
	if (user.role !== "admin") {
		return <Navigate to="/home" replace/>
	}
	return children
}


function App() {
     	return (
		<BrowserRouter>
		
          		<AuthorizationProvider>
                    	<Routes>
                         	<Route path='/login' element={<Login/>}/>
					<Route path='/' element={<AuthUserRoute><Layout/></AuthUserRoute>}>
						<Route index element={<Homepage/>} />
						<Route path='/home' index element={<Homepage/>} />
						<Route path='/favorites' element={<Favorites/>} />
						<Route path='/mechanics' element={<Mechanics/>} />
						<Route path='/filters' element={<Filters/>} />
							<Route path='/admin' element={<AuthAdminRoute><Admin/></AuthAdminRoute>} >
						
							</Route>					
					</Route>
                    	</Routes>
                    	{/* <LoginForm/> */}
          		</AuthorizationProvider>
               	{/* <CityCreate/> */}
            </BrowserRouter>
    
     )
}

export default App
