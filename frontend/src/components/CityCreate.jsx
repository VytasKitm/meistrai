import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React, { useState }from 'react'
import { createCityAPI } from '../services/citiesAPI'

const city = {
	name: ""
}

export const CityCreate = () => {
const  [cityName, setCity] = useState(city)

const setCityF = (property, value) => {
	setCity(prev => ({...prev, [property]: value}))
}

async function submitCityFunction(event) {
	event.preventDefault()

	if (!cityName.name){
		console.log("Truksta miesto pavadinimo")
		return
	}

	createCityAPI(cityName)
	setCityF("name", "")
}

return (
	<>
	<Form onSubmit={submitCityFunction} data-bs-theme="dark" className='position-absolute top-50 start-50 translate-middle vh-20 component p-5'>
		<Form.Group className="mb-3">
			<Form.Label>City</Form.Label>
			<Form.Control onChange={e => setCityF("name", e.target.value)}type="text" placeholder="Enter city" value={cityName.name} />
		</Form.Group>
		<Button variant="primary" type="submit" data-bs-theme="dark">
		      Submit
		</Button>
    	</Form>
	</>
)
}
