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

const mechanicCreateAPI = async(name, lastName, serviceId, specializationId) => {
      const token = localStorage.getItem('token')
      const mechanic = await axios.post('http://localhost:3000/mechanics/create', {name, lastName, serviceId, specializationId}, 
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      )
      return mechanic
}

const mechanicUpdateAPI = async ({id, name, lastName, serviceId, specializationId}) => {
      const token = localStorage.getItem('token')
      const mechanic = await axios.put('http://localhost:3000/mechanics/update', {id, name, lastName, serviceId, specializationId},
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      )
      return mechanic
}

const mechanicDeleteAPI = async (id) => {
      const token = localStorage.getItem('token')
      const res = await axios.delete(`http://localhost:3000/mechanics/delete/${id}`,
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      )
      return res
}

export {mechanicsGetAllAPI, mechanicCreateAPI, mechanicUpdateAPI, mechanicDeleteAPI}