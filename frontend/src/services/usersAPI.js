import axios from 'axios'

const loginUserAPI = async (email, password) => {
      try {
            const res = await axios.post('http://localhost:3000/users/login', {email, password})
            return res
      }
      catch (error) {
            console.log("Error loginUserAPI", error)
            throw error
      }
}


const infoUserAPI = async (id) => {
      try {
            const res = await axios.get(`http://localhost:3000/users/${id}`)
            console.log(res.data)
            return res.data
      }
      catch (error) {
            console.log("Error geting user (infoUserAPI", error)
            throw error
      }
}

const createUserAPI = async (name, email, password) => {
            const res = await axios.post('http://localhost:3000/users/create', {name, email, password})
            return res
}



export {loginUserAPI, infoUserAPI, createUserAPI}