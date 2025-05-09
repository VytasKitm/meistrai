import React, {useState, useEffect} from 'react'
import { createUserAPI, getAllUsersAPI } from '../../services/usersAPI'
import Button from 'react-bootstrap/Button'
import { UsersTable } from './UsersTable'
import { deleteUserAPI, updateUserAPI, createUserAdminAPI } from '../../services/usersAPI'
import { UserEdit } from './UserEdit'
import { UserCreate } from './UserCreate'

export const Users = () => {
  	const [users, setUsers] = useState([])
	const [pageState, setPageState] = useState(null)
	const [editUser, setEditUser] = useState(null)

	useEffect(() => {
		getAllUsers()
	},[])


	async function getAllUsers() {
		const usersRes = await getAllUsersAPI()
		console.log(users)
		setUsers(usersRes)
		setPageState("table")
  		}

	function findEditUser(id) {
		const editUser = users.find((user) => user.id === id)
		setEditUser(editUser)
		setPageState("edit")
	}

	async function createUser(name, email, role, password) {
		await createUserAdminAPI(name, email, role, password)
		getAllUsers()
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
          		{/* <Button onClick={test}> Get All Users</Button>
			<Button onClick={() => setPageState("edit")}> Edit page</Button> */}

			{pageState === "edit" ? 
				(<UserEdit editUser={editUser} userUpdate={userUpdate} setPageState={setPageState}/>) :
			pageState === "table" ?
				(<UsersTable users={users} userDelete={userDelete} findEditUser={findEditUser} setPageState={setPageState}/>) :
			pageState === "create" ?
				(<UserCreate createUser={createUser} setPageState={setPageState}/>) :
				(<></>)
			}
			
        	</div>
  	)
}
