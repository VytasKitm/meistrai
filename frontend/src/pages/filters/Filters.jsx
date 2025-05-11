import React, {useState, useEffect, useContext} from 'react'
import { MechanicCard } from '../homepage/MechanicCard'
import { mechanicsGetAllAPI } from '../../services/mechanicsAPI'
import { ratingsAddAPI, ratingsByUserAPI, ratingsDeleteAPI } from '../../services/ratingsAPI'
import { AuthorizationContext } from '../../context/AuthorizationProvider'


export const Filters = () => {
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
                  getRatingsByUser(user.id)
                  getMechanics()
            }
            catch (error) {
                  console.log("addRating Error:", error)
            }
      }

      async function deleteRating(mechanics_id) {
            console.log(mechanics_id)
            console.log(user.id)
            try {
                  await ratingsDeleteAPI(user.id, mechanics_id)
                  getRatingsByUser(user.id)
                  getMechanics()
            }
            catch (error) {
                  console.log("deleteRating Error", error)
            }
      }


      async function getRatingsByUser(id) {
            const ratings = await ratingsByUserAPI({id})
            setRatedMechanics(ratings)
      }


      useEffect(() => {
            getMechanics()
            getRatingsByUser(user.id)
      },[])


      return (
      <div className='position-relative h-100 v-100 mt-5'>
            <MechanicCard mechanicsArray={mechanicsArray} addRating={addRating} deleteRating={deleteRating} ratedMechanics={ratedMechanics} user={user}/>
      </div>
      )
}
