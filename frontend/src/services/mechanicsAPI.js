import axios from 'axios'


const mechanicsGetAllAPI = async() => {
      const token = localStorage.getItem('token')
      const mechanics = await axios.get('http://localhost:3000/mechanics/get',
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      )
      return Array.isArray(mechanics.data) ? mechanics.data : []
}

export {mechanicsGetAllAPI}