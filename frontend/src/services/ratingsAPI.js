import axios from 'axios'

const ratingsByUserAPI = async({id}) => {
      const token = localStorage.getItem('token')
      const ratings = await axios.get(`http://localhost:3000/ratings/getUser/${id}`,
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      )
      return ratings.data
}

const ratingsByMechanicAPI = async({id}) => {
      const token = localStorage.getItem('token')
      const ratings = await axios.get(`http://localhost:3000/ratings/getMechanic/${id}`,
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      )
      return ratings.data
}

const ratingsAddAPI = async (users_id, mechanics_id) => {
      const token = localStorage.getItem('token')
      const ratings = await axios.post('http://localhost:3000/ratings/add', {users_id, mechanics_id},
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      )
}

const ratingsDeleteAPI = async (users_id, mechanics_id) => {
      const token = localStorage.getItem('token')
      const res = await axios.delete('http://localhost:3000/ratings/delete',
             {    data: {
                  users_id, 
                  mechanics_id
                  },
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      )
}


export {ratingsByUserAPI, ratingsByMechanicAPI, ratingsAddAPI, ratingsDeleteAPI}