import React, {useState, useEffect} from 'react'
import { getAllUsersAPI } from '../../services/usersAPI'
import Button from 'react-bootstrap/Button'
import { UsersTable } from './UsersTable'
import { deleteUserAPI, updateUserAPI, infoUserAPI } from '../../services/usersAPI'
import { UserEdit } from './UserEdit'

export const Users = () => {
  	const [users, setUsers] = useState([])
	const [editState, setEditState] = useState(false)
	const [editUser, setEditUser] = useState(null)

	useEffect(() => {
		getAllUsers()
	},[])


	async function getAllUsers() {
		const usersRes = await getAllUsersAPI()
		console.log(users)
		setUsers(usersRes)
  		}

	function findEditUser(id) {
		const editUser = users.find((user) => user.id === id)
		setEditUser(editUser)
		setEditState(true)
	}

	function test() {
		console.log(editUser)
	}


	async function userUpdate(updatedUser) {
		try {
			await updateUserAPI(updatedUser)
			getAllUsers()
		}
		catch (error) {
			console.log("update User (userEdit) Erorr: ", error)
		}

	}

	async function userDelete(id) {
		try {
			await deleteUserAPI(id)
			await getAllUsers()
		}
		catch(error) {
			console.log("Error deleting user. userDelete", error )
		}
	}


	return (
        	<div className='position-relative h-100 v-100 mt-5' >
          		<Button onClick={test}> Get All Users</Button>
			<Button onClick={() => setEditState(true)}> Edit page</Button>

			{editState ? 
				(<UserEdit editUser={editUser} userUpdate={userUpdate} setEditState={setEditState}/>) :
				(<UsersTable users={users} userDelete={userDelete} findEditUser={findEditUser}/>)
			}
			
        	</div>
  	)
}
