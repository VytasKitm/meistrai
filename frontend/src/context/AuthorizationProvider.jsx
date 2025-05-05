import { useState, createContext, Children } from 'react'
import { jwtDecode } from 'jwt-decode'
import { loginUserAPI } from '../services/usersAPI'

const AuthorizationContext = createContext()

export const AuthorizationProvider = ({children}) => {
      const [user, setUser] = useState(null)

      async function login(email, password) {
            const res = await loginUserAPI(email, password)
            console.log(res)
            if (res.status === 200) {
                  const {token} = res.data
                  localStorage.setItem('token', token)

                  const {userId, userRole} = jwtDecode
                  setUser({id: userId, role: userRole})
            }
      }

      return (
            <AuthorizationContext.Provider value={{user, login}}>
                  {children}
            </AuthorizationContext.Provider>
      )
}

export { AuthorizationContext }