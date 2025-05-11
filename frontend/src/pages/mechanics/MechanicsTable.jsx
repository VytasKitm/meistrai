import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { ActionSelect } from '../../components/ActionSelect'

export const MechanicsTable = ({setPageState, mechanicsArray, findEditMechanic, deleteMechanic}) => {
  	return (
    		<div data-bs-theme="dark" className='d-flex flex-column mx-auto mt-5 p-4 component' style={{width: "80vw", maxHeight: "90vh", tableLayout: "auto"}}>
		<h3>Mechanics table</h3>
            <br />
		<div className='flex-grow-1 overflow-auto'>
			<Table striped bordered hover >
				<thead>
				<tr>
				<th>#</th>
				<th>Name</th>
				<th>Last Name</th>
				<th>Service</th>
				<th>City</th>
				<th>Specialization</th>
				<th>Rating</th>
				<th style={{width: '1%'}}>Action</th>
				</tr>
				</thead>
				{mechanicsArray.map((mechanic, index) => (
					<tbody key={mechanic.id}>
						<tr>
							<td>{index+1}</td>
							<td>{mechanic.mechanics_name}</td>
							<td>{mechanic.mechanics_last_name}</td>
							<td>{mechanic.service_name}</td>
							<td>{mechanic.city_name}</td>
							<td>{mechanic.specialization_name}</td>
							<td>{mechanic.rating}</td>
							<td><ActionSelect targetId={mechanic.id} deleteAction={deleteMechanic} editAction={findEditMechanic}/></td>
						</tr>
					</tbody>
				))}
    			</Table>
		</div>

			
			<Button style={{width: "8vw"}} onClick={() => setPageState("create")} variant="primary" type="button" size="sm">
                        Add Mechanic
                  </Button>
			

    		</div>
  	)
}
