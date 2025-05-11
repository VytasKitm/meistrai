import axios from 'axios'

const specializationsGetAllAPI = async () => {
      const token = localStorage.getItem("token")
      const res = await axios.get('http://localhost:3000/specializations/get',
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      )
      return res.data
}

export {specializationsGetAllAPI}