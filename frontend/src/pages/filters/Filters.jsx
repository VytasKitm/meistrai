import React, {useState, useEffect, useContext} from 'react'
import { MechanicCard } from '../homepage/MechanicCard'
import { mechanicsGetAllAPI } from '../../services/mechanicsAPI'
import { ratingsAddAPI, ratingsByUserAPI, ratingsDeleteAPI } from '../../services/ratingsAPI'
import { AuthorizationContext } from '../../context/AuthorizationProvider'
import { searchAPI } from '../../services/searchAPI'
import { debounce } from 'debounce'
import  InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'


export const Filters = () => {
      const [mechanicsArray, setMechanicsArray] = useState([])
      const {user} = useContext(AuthorizationContext)
      const [ratedMechanics, setRatedMechanics] = useState([])
	const [searchQ, setSearchQ] = useState("")

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
			searchMechanics()
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
			searchMechanics()
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

	async function searchMechanics() {
		try {
			if (searchQ !== ""){
				const data = await searchAPI(searchQ)
				setMechanicsArray(data)
				console.log(data)
			}
			else {
				getMechanics()
			}
		}
		catch(error) {
			console.log("Error searchnig", error)
		}
	}

	useEffect(() => {

		if (searchQ === "") {
			getMechanics()
			return
		}

		const search = setTimeout(() => {
			searchMechanics()
		}, 250)

		return () => clearTimeout(search)

	},[searchQ])


	function clear() {
		setSearchQ("")
	}


      return (
      <div className='position-relative h-100 v-100 mt-5'>
		<div className='d-flex justify-content-center'>
		<InputGroup style={{width: "20vw"}} className="mb-0 pb-0">
        		<Form.Control onChange={(e) => setSearchQ(e.target.value)} placeholder="Search" value={searchQ}/>
        		<Button style={{color: "white"}} onClick={clear} variant="outline-secondary">
         	 	Clear
        		</Button>
      	</InputGroup>
		</div>
            <MechanicCard mechanicsArray={mechanicsArray} addRating={addRating} deleteRating={deleteRating} ratedMechanics={ratedMechanics} user={user}/>
      </div>
      )
}
