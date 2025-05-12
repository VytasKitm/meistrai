import axios from 'axios'

const searchAPI = async (q) => {
      const token = localStorage.getItem('token')
      const {data} = await axios.get('http://localhost:3000/search', 
            {
                  params: {q},
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            })
      return data
}

export {searchAPI}