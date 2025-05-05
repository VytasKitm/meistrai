import axios from 'axios'

const loginUserAPI = async (email, password) => {
      try {
            console.log("loginUserapi", email,password)
            const res = await axios.post('http://localhost:3000/users/login', {email, password})
            return res
      }
      catch (error) {
            console.log("Error loginUserAPI", error)
            throw error
      }
}

export {loginUserAPI}