import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { ActionSelect } from './ActionSelect'

export const UsersTable = ({users, userDelete, findEditUser}) => {
  	return (
    		<div data-bs-theme="dark" className='position-absolute top-50 start-50 translate-middle vh-20 component p-4'>
			<Table striped bordered hover>
				<thead>
				<tr>
				<th>#</th>
				<th>Username</th>
				<th>Email</th>
				<th>Status</th>
				<th>Action</th>
				</tr>
				</thead>
				{users.map((users, index) => (
					<tbody key={users.id}>
						<tr>
							<td>{index+1}</td>
							<td>{users.name}</td>
							<td>{users.email}</td>
							<td style={{color: users.role === "admin" ? 'lightblue' : 'green'}}>{users.role}</td>
							<td><ActionSelect userDelete={userDelete} usersId={users.id} findEditUser={findEditUser} /></td>
						</tr>
					</tbody>
				))}
    			</Table>
			
			<Button variant="primary" type="button">
                        Clear
                  </Button>
			

    		</div>
  	)
}
