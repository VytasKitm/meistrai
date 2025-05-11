import React, {useState, useEffect} from 'react'
import { ServicesTable } from './ServicesTable'
import { ServiceCreate } from './ServiceCreate'
import { ServiceEdit } from './ServiceEdit'
import { getAllServicesAPI, createServiceAPI, updateServiceAPI, deleteServiceAPI } from '../../services/servicesAPI'
import { getCitiesAPI } from '../../services/citiesAPI'
import  Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

 
export const Services = () => {
	const [servicesArray, setServicesArray] = useState([])
	const [pageState, setPageState] = useState(null)
	const [citiesArray, setCitiesArray] = useState([])
	const [editService, setEditService] = useState(null)
	const [alert, setAlert] = useState("")
	

	useEffect(() => {
		getAllServices()
		getAllCities()
	},[])

	async function getAllServices() {
		const services = await getAllServicesAPI()
		setServicesArray(services)
		setPageState("table")
	}

	async function getAllCities() {
		const cities = await getCitiesAPI()
		console.log(citiesArray)
		console.log("cities")
		setCitiesArray(cities)

	}

	async function createService(service_name, city_id) {
		await createServiceAPI(service_name, city_id)
		getAllServices()
	}

	function findEditService(id) {
		const editService = servicesArray.find((service) => service.id === id)
		console.log(editService)
		setEditService(editService)
		setPageState("edit")

	}

	async function serviceUpdate(updatedService) {
		try {
			await updateServiceAPI(updatedService)
			getAllServices()
		}
		catch (error) {
			console.log("Error serviceUpdate", error)
		}
	}


	async function deleteService(id) {
		setAlert("")
		try {
			await deleteServiceAPI(id)
			getAllServices()
		}
		catch (error) {
			const status = error.response?.status
                  const code = error.response?.data?.code

                  if (status === 409 && code === '23503') {
                        setAlert("Service is in use.")
                  }
                  else {
                        setAlert(error.message || "Error")
                  }
                  console.log(error)
			console.log("Error deleting service", error)
		}
	}


  	return (
		<>
        	<div className='position-relative h-100 v-100 mt-5' >
			{/* <div className='mt-5 d-inline-flex'></div> */}
			{pageState === "edit" ? 
				(<ServiceEdit citiesArray={citiesArray} editService={editService} serviceUpdate={serviceUpdate} setPageState={setPageState}/>) :
			pageState === "table" ?
				(<ServicesTable servicesArray={servicesArray} setPageState={setPageState} findEditService={findEditService} deleteService={deleteService}/>) :
			pageState === "create" ?
				(<ServiceCreate getAllCities={getAllCities} citiesArray={citiesArray} createService={createService} setPageState={setPageState}/>) :
				(<Spinner animation="border"/>)
			}
        	</div>
		{alert && (<Alert variant="danger" className='position-absolute top-50 start-50 translate-middle p-5 ' data-bs-theme="dark" dismissible><Alert.Heading>{alert}</Alert.Heading></Alert>)}
		</>
  	)
}
