import React, {useState, useEffect, useContext} from 'react'
import { MechanicCard } from '../homepage/MechanicCard'
import { mechanicsGetAllAPI } from '../../services/mechanicsAPI'
import { ratingsAddAPI, ratingsByUserAPI, ratingsDeleteAPI } from '../../services/ratingsAPI'
import { AuthorizationContext } from '../../context/AuthorizationProvider'


export const Favorites = () => {
      const [mechanicsArray, setMechanicsArray] = useState([])
	const [mechanicsFiltered, setMechanicsFiltered] = useState([])
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
			filter()
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
			filter()
            }
            catch (error) {
                  console.log("deleteRating Error", error)
            }
      }

	function filter() {
		const favId = new Set(ratedMechanics.map(mech => mech.id))
		console.log(favId)
		const favoritedMechanics = mechanicsArray.filter(mech => favId.has(mech.id))
		// setMechanicsFiltered(favoritedMechanics)
		setMechanicsFiltered(favoritedMechanics)
	}


      async function getRatingsByUser(id) {
            const ratings = await ratingsByUserAPI({id})
            setRatedMechanics(ratings)
      }


      useEffect(() => {
            getMechanics()
            getRatingsByUser(user.id)
      },[])

	useEffect(() => {
		filter()
	},[ratedMechanics, mechanicsArray])

  	return (
    	<div className='position-relative h-90 v-100 mt-5' >
      	<MechanicCard mechanicsArray={mechanicsFiltered} deleteRating={deleteRating} addRating={addRating} ratedMechanics={ratedMechanics}/>
    	</div>
  	)
}
