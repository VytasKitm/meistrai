import { useState, createContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { loginUserAPI } from '../services/usersAPI'
import { useNavigate } from 'react-router-dom'

const AuthorizationContext = createContext()

export const AuthorizationProvider = ({children}) => {
      const navigate = useNavigate()
      const [user, setUser] = useState(()=> {
            const token = localStorage.getItem("token")
            if (!token) {
                  return null
            }
            try {
                  const {userId, userRole} = jwtDecode(token)
                  return {id: userId, role: userRole}
            }
            catch{
                  localStorage.removeItem("token")
                  return null
            }

      })

      async function login(email, password) {
            const res = await loginUserAPI(email, password)
            // console.log(res)
            if (res.status === 200) {

                  const {token} = res.data
                  localStorage.setItem('token', token)

                  const {userId, userRole} = jwtDecode(token)
                  console.log(userId)
                  console.log(userRole)
                  setUser({id: userId, role: userRole})
                  console.log("User in context:", user)
                  navigate("/", {replace: true})
            }
      }

      async function logout() {
            localStorage.removeItem("token")
            setUser(null)
      }

      // useEffect(() => {
      //       const token = localStorage.getItem("token")
      //       if (token) {
      //             try {
      //                   const {userId, userRole} = jwtDecode(token)
      //                   setUser({id: userId, role: userRole})
      //             }
      //             catch {
      //                   localStorage.removeItem("token")
      //                   console.log("Blogas tokenas. Prisijungti is naujo")
      //             }
      //       }
      // },[])

      return (
            <AuthorizationContext.Provider value={{user, login, logout}}>
                  {children}
            </AuthorizationContext.Provider>
      )
}

export { AuthorizationContext }