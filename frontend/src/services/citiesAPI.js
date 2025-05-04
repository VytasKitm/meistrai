import axios from 'axios'

const createCityAPI = async (cityName) => {
      try {
            const res = await axios.post('http://localhost:3000/cities', cityName)
            return res.status
      }
      catch (error) {
            console.log("Error createCityAPI.", error)
      }
}

export {createCityAPI}