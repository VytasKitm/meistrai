import { useState, createContext, Children } from 'react'
import { jwtDecode } from 'jwt-decode'
import { loginUserAPI } from '../services/usersAPI'

const AuthorizationContext = createContext()

export const AuthorizationProvider = ({children}) => {
      const [user, setUser] = useState(null)

      async function login(email, password) {
            const res = loginUserAPI({email, password})
            if (res.status === 200) {
                  const {token} = await res.json()
                  localStorage.setItem('token', token)

                  const {userId, userRole} = jwtDecode
                  setUser({id: userId, role: userRole})
            }
      }

      return (
            <AuthorizationContext.Provider value={{user, login}}>
                  {Children}
            </AuthorizationContext.Provider>
      )
}

export { AuthorizationContext }