import React, {useContext, useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {NavLink} from 'react-router-dom'

export const NavbarLogin = ({registerState, setRegisterState, clear}) => {

	function registerSet(){
		clear()
		setRegisterState("register")
	}

	function loginSet(){
		clear()
		setRegisterState("login")
	}
	

	return (
	<Navbar expand="lg" fixed="top" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      	<Container fluid>
			<Navbar.Brand>Mechanics</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav"> 
					<Nav className="ms-auto" variant="pills">	
						{registerState === "login" && (<Button onClick={registerSet} variant="outline-light"  className='ms-2 p-1' size='sm'>Register</Button>)}
						{registerState === "register" && (<Button onClick={loginSet} variant="outline-light"  className='ms-2 p-1' size='sm'>Log In</Button>)}
					</Nav>
				</Navbar.Collapse>
      	</Container>
    	</Navbar>
  	)
}
