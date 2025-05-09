import React, {useState} from 'react'
import { getAllUsersAPI } from '../../services/usersAPI'
import Button from 'react-bootstrap/Button'
import { UsersTable } from './UsersTable'
import { deleteUserAPI } from '../../services/usersAPI'

export const Users = () => {
  	const [users, setUsers] = useState([])

  	async function getAllUsers() {
		const usersRes = await getAllUsersAPI()
		console.log(users)
		setUsers(usersRes)
  	}

	async function userEdit() {

	}

	async function userDelete(id) {
		try {
			const res = await deleteUserAPI(id)
			console.log("userDelete")
			console.log(res)
		}
		catch(error) {
			console.log("Error deleting user. userDelete", error )
		}
	}


	return (
        	<div className='position-relative h-100 v-100 mt-5' >
          		<Button onClick={getAllUsers}> Get All Users</Button>
			<UsersTable users={users} userEdit={userEdit} userDelete={userDelete} />
        	</div>
  	)
}
