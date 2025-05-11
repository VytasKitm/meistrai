import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { ActionSelect } from '../../components/ActionSelect'

export const ServicesTable = ({setPageState, servicesArray, findEditService, deleteService}) => {
  	return (
    		<div data-bs-theme="dark" className='d-flex flex-column mx-auto mt-5 p-4 component' style={{width: "50vw", maxHeight: "80vh", tableLayout: "auto"}}>
		<h3>Services table</h3>
            <br />
		<div className='flex-grow-1 overflow-auto'>
			<Table striped bordered hover >
				<thead>
				<tr>
				<th>#</th>
				<th>Name</th>
				<th>City</th>
				<th style={{width: '1%'}}>Action</th>
				</tr>
				</thead>
				{servicesArray.map((services, index) => (
					<tbody key={services.id}>
						<tr>
							<td>{index+1}</td>
							<td>{services.service_name}</td>
							<td>{services.city_name}</td>
							<td><ActionSelect editAction={findEditService} targetId={services.id} deleteAction={deleteService}/></td>
						</tr>
					</tbody>
				))}
    			</Table>
		</div>

			
			<Button style={{width: "5vw"}} onClick={() => setPageState("create")} variant="primary" type="button" size="sm">
                        Add Service
                  </Button>
			

    		</div>
  	)
}

// className='position-absolute top-50 start-50 translate-middle component p-4'
// className='mx-auto mt-5 p-4 component'