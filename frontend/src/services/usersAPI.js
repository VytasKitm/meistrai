import axios from 'axios'

const loginUserAPI = async (email, password) => {
      try {
            const res = await axios.post('http://localhost:3000/users', {email, password})
            return res
      }
      catch (error) {
            console.log("Error loginUserAPI", error)
      }
}

export {loginUserAPI}