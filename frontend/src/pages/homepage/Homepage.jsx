import React, {useState, useEffect, useContext} from 'react'
import { MechanicCard } from './MechanicCard'
import { mechanicsGetAllAPI } from '../../services/mechanicsAPI'
import { ratingsByMechanicAPI, ratingsAddAPI, ratingsByUserAPI } from '../../services/ratingsAPI'
import { AuthorizationContext } from '../../context/AuthorizationProvider'


export const Homepage = () => {
      const [mechanicsArray, setMechanicsArray] = useState([])
      const {user} = useContext(AuthorizationContext)
      const [ratedMechanics, setRatedMechanics] = useState([])

      async function getMechanics() {
            const mechanics = await mechanicsGetAllAPI()
            console.log(mechanics)
            console.log(user.id)
            setMechanicsArray(mechanics)
      }

      async function addRating(mechanics_id) {
            try {

                  await ratingsAddAPI(user.id, mechanics_id)
                  getMechanics()
            }
            catch (error) {
                  console.log("addRating Error:", error)
            }
      }

      async function getRatingsByUser(id) {
            const ratings = await ratingsByUserAPI({id})
            setRatedMechanics(ratings)
      }

      async function ratingToggle() {
            
      }

      useEffect(() => {
            getMechanics()
            getRatingsByUser(user.id)
      },[])


      return (
      <div className='position-relative h-100 v-100 mt-5'>
            <MechanicCard mechanicsArray={mechanicsArray} addRating={addRating} ratedMechanics={ratedMechanics} user={user}/>
      </div>
      )
}
