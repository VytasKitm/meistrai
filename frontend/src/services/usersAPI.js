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
            return res.data
      }
      catch (error) {
            console.log("Error geting user (infoUserAPI", error)
            throw error
      }
}

const createUserAPI = async (name, email, role, password) => {
      console.log("createUserAPI sending", {name, email, role, password})
      const res = await axios.post('http://localhost:3000/users/create', {name, email, role, password})
      return res
}


const createUserAdminAPI = async (name, email, role, password) => {
            const token = localStorage.getItem('token')
            const res = await axios.post('http://localhost:3000/users/create/admin', {name, email, role, password},
                  {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            })
            return res
}


const getAllUsersAPI = async () => {
      const res = await axios.get('http://localhost:3000/users/get')
      return res.data
}

const deleteUserAPI = async (id) => {
      try {
            const token = localStorage.getItem('token')
            const res = await axios.delete(`http://localhost:3000/users/delete/${id}`,
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            })
            return res
      }
      catch (error) {
            console.log("deleteUserAPI: ", error)
      } 
}

const updateUserAPI = async ({id, name, email, role, password}) => {
      const token = localStorage.getItem('token')
      const res = await axios.put('http://localhost:3000/users/update', {id, name, email, role, password},
      {
            headers: {
                        Authorization: `Bearer ${token}`
                  }
      })
      return res
}


export {loginUserAPI, infoUserAPI, createUserAPI, getAllUsersAPI, deleteUserAPI, updateUserAPI, createUserAdminAPI}