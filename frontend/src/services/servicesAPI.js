import axios from 'axios'

const getAllServicesAPI = async () => {
      const res = await axios.get('http://localhost:3000/services/get')
      console.log("getAllUsersAPI: ",res)
      return res.data
}

const createServiceAPI = async (service_name, city_id) => {
      const token = localStorage.getItem('token')
      const res = await axios.post('http://localhost:3000/services/create', {service_name, city_id},
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            })
            return res

}

const updateServiceAPI = async ({id, service_name, city_id}) => {
      const token = localStorage.getItem('token')
      const res = await axios.put('http://localhost:3000/services/update', {id, service_name, city_id},
      {
            headers: {
                        Authorization: `Bearer ${token}`
                  }
      })
      console.log("updateServiceAPI: ", res)
      return res
}

const deleteServiceAPI = async (id) => {
      // try {
            const token = localStorage.getItem('token')
            const res = await axios.delete(`http://localhost:3000/services/delete/${id}`,
                  {
                        headers: {
                              Authorization: `Bearer ${token}`
                        }
                  })
            return res
      }
      // catch (error) {
      //       console.log("Error deleteServiceAPI", error)
      //       throw (error)
      // }
// }

export {getAllServicesAPI, createServiceAPI, updateServiceAPI, deleteServiceAPI}