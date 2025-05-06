import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown'

export const NavbarComp = () => {
  	return (
	<Navbar expand="lg" fixed="top" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      	<Container fluid>
			<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav"> 
					<Nav className="me-auto" variant="tabs" defaultActiveKey="/home">
						<Nav.Link href="/home">Home</Nav.Link>
						<Nav.Link href="/favorites">Favorites</Nav.Link>
						<Nav.Link href="/mechanics">Mechanics</Nav.Link>
						<Nav.Link href="/filters">Filters</Nav.Link>
						<Nav.Link href="/admin">Admin Panel</Nav.Link>
						<Nav.Link href="#link">Link</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav className="ms-auto" variant="pills">	
						<Navbar.Text>
							Signed in as: <a href="#login">User</a>
						</Navbar.Text>
						<Button variant="outline-light"  className='ms-2 p-1' size='sm'>Log Out</Button>
					</Nav>
				</Navbar.Collapse>
      	</Container>
    	</Navbar>
  	)
}
