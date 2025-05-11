import axios from 'axios'

const createCityAPI = async (cityName) => {
      try {
            const res = await axios.post('http://localhost:3000/cities', {cityName})
            return res  
      }
      catch (error) {
            console.log(error)
            throw (error)
      }
}

const getCitiesAPI = async () => {
      try  {
            const cities = await axios.get('http://localhost:3000/cities/get')
            console.log(cities)
            return cities.data
      }
      catch (error) {
            console.log("Error geting cities", error)
      }
}

export {createCityAPI, getCitiesAPI}