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
import { Filters } from './pages/filters/Filters'

import { Mechanics } from './pages/mechanics/Mechanics'
import { Users } from './pages/users/Users'
import { Services } from './pages/services/Services'
import { Cities } from './pages/cities/Cities'



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
                         <Route path='/filters' element={<Filters/>} />
                         <Route path='/admin' element={<AuthAdminRoute><Admin/></AuthAdminRoute>} >
                              <Route index element={<Mechanics/>} />
                              <Route path='/admin/mechanics' element={<Mechanics/>} />
                              <Route path='/admin/users' element={<Users/>} />
                              <Route path='/admin/services' element={<Services/>} />
                              <Route path='/admin/cities' element={<Cities/>} />
                         </Route>					
                    </Route>
               </Routes>
          </AuthorizationProvider>
     </BrowserRouter> 
     )
}

export default App
