import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

export const MechanicCard = ({mechanicsArray, ratedMechanics, addRating, deleteRating}) => {

      const isRated = ((ratedMech, mech) => {
            const exists = ratedMech.some((rated) => rated.id === mech.id)
            return exists ? "no-hover ratingButton-selected" : "no-hover ratingButton-notSelected"
      })

      function toggleRating(mech_id) {
            const exists = ratedMechanics.find((rated) => rated.id === mech_id)

            exists ? 
            deleteRating(mech_id) :
            addRating(mech_id)
      }



  return (
      <>
      <div data-bs-theme="dark" className='d-flex mx-auto mt-5 p-4 component' style={{maxWidth: "90vw", maxHeight: "90vh", tableLayout: "auto"}}>
            <div className='flex-grow-1 d-flex justify-content-center flex-wrap overflow-auto'>
                  {console.log("ratedMechanics:", ratedMechanics)}
                  {mechanicsArray.map((mechanic) =>  (
                  <Card key={mechanic.id} style={{width: "15vw"}} className='me-4 mb-5'>
                        <Card.Img variant="top" src="./photo_placeholder.png" />
                        <Card.Body>
                              <Card.Title>{mechanic.mechanics_name}</Card.Title>
                              <Card.Title>{mechanic.mechanics_last_name}</Card.Title>
                              <Card.Text>
                              </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                              <ListGroup.Item>Service: {mechanic.service_name}</ListGroup.Item>
                              <ListGroup.Item>Specialization: {mechanic.specialization_name}</ListGroup.Item>
                              <ListGroup.Item>City: {mechanic.city_name}</ListGroup.Item>
                              <ListGroup.Item>Rating: {mechanic.rating}  <Button className={isRated(ratedMechanics, mechanic)} onClick={() => toggleRating(mechanic.id)}>&hearts;</Button></ListGroup.Item>
                        </ListGroup>
                  </Card>
                  ))}
            </div>
      </div>
      </>
  )
}
