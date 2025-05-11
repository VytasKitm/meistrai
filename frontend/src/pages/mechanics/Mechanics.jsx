import React, {useState, useEffect} from 'react'
// import { ServicesTable } from './ServicesTable'
// import { ServiceCreate } from './ServiceCreate'
// import { ServiceEdit } from './ServiceEdit'
import { MechanicsTable } from './MechanicsTable'
import { MechanicCreate } from './MechanicCreate'
import { MechanicEdit } from './MechaincEdit'
import { getAllServicesAPI } from '../../services/servicesAPI'
import { getCitiesAPI } from '../../services/citiesAPI'
import { mechanicsGetAllAPI, mechanicCreateAPI, mechanicUpdateAPI, mechanicDeleteAPI } from '../../services/mechanicsAPI'
import { specializationsGetAllAPI } from '../../services/specializationsAPI'
import  Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

 
export const Mechanics = () => {
	const [mechanicsArray, setMechanicsArray] = useState([])
	const [pageState, setPageState] = useState(null)
	const [servicesArray, setServicesArray] = useState([])
	const [specArray, setSpecArray] = useState([])
	const [editMechanic, setEditMechanic] = useState(null)


	useEffect(() => {
		getAllServices()
		getMechanics()
		getSpecializations()
	},[])

      async function getMechanics() {
            const mechanics = await mechanicsGetAllAPI()
            console.log(mechanics)
            setMechanicsArray(mechanics)
		setPageState("table")
      }

	async function deleteMechanic(id) {
		try {
			await mechanicDeleteAPI(id)
			getMechanics()
		}
		catch(error) {
			console.log("Error deleting mechanic", error)
		}
	}


	async function updateMechanic(id, name, lastName, serviceId, specializationId) {
		const mechanic = await mechanicUpdateAPI({id, name, lastName, serviceId, specializationId})
		getMechanics()
		console.log(mechanic)
		setPageState("table")


	}

	async function getSpecializations() {
		const spec = await specializationsGetAllAPI()
		console.log(spec)
		setSpecArray(spec)
	}

	function findEditMechanic(id) {
		const editObj = mechanicsArray.find((mechanic) => mechanic.id === id)
		setEditMechanic(editObj)
		setPageState("edit")
	}


	async function getAllServices() {
		const services = await getAllServicesAPI()
		console.log(services)
		setServicesArray(services)
	}

	async function createMechanic(name, lastName, serviceId, specializationId) {
		try {
			await mechanicCreateAPI(name, lastName, serviceId, specializationId)
			getMechanics()
			setPageState("table")
		}
		catch (error) {
			console.log("Error creating mechanic")
		}
	}


  	return (
		<>
        	<div className='position-relative h-100 v-100 mt-5' >
			{pageState === "edit" ? 
				(<MechanicEdit   setPageState={setPageState} editMechanic={editMechanic} updateMechanic={updateMechanic} servicesArray={servicesArray} specArray={specArray}/>) :
			pageState === "table" ?
				(<MechanicsTable mechanicsArray={mechanicsArray} setPageState={setPageState} findEditMechanic={findEditMechanic} deleteMechanic={deleteMechanic}/>) :
			pageState === "create" ?
				(<MechanicCreate setPageState={setPageState} servicesArray={servicesArray} specArray={specArray} createMechanic={createMechanic}/>) :
				(<Spinner animation="border"/>)
			}
        	</div>
		</>
  	)
}