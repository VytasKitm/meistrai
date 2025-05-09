import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

export const ActionSelect = ({userDelete, usersId}) => {
  	return (
    	<>
	<DropdownButton id="dropdown-basic-button" title="Actions" size="sm" variant="secondary">
      <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
	<Dropdown.Divider/>
      <Dropdown.Item as="button" onClick={() => userDelete(usersId)}>Delete</Dropdown.Item>
    	</DropdownButton>
    	</>
  	)
}
