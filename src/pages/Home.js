
import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import VaccantIcon from "../assets/Icons/vacant.png";


import './Home.css'
import Cardlist  from '../component/Cardlist';
const cardData =[
  {
    id: 1,
    title:'Table no 1',

  },
  {
    id: 2,
    title:'Table no 2',

  },
  {
    id: 3,
    title:'Table no 3',
  
  },
  {
    id: 4,
    title:'Table no 4',

  },

]
function BasicExample() {
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedCard, setSelectedCard]= useState();
  const handleClose = () => setModalShow(false);
  const handleShow = (card) => {
    setSelectedCard(card);
    setModalShow(true);
  };
  return (
    <>
   <div className='contain'>
   {cardData.map((card) => (
    
    <Card key={card.id} className='card-container' style={{ width: '18rem' }}>
   
   <Card.Body>
      <Card.Title>{card.title}</Card.Title>
      <div className='vacant-icon'><img alt= "occupy" src={VaccantIcon} width="50" height="50" style={{marginRight:"5px"}}/>
      <Button className="add-item-btn" onClick={()=>handleShow(card)}>Add Occupy Table</Button>
      </div>
    </Card.Body>
   
  </Card>
  
  ))}

        <Cardlist/>
  
      {/* <div className='Earning'>
      <div><Card style={{ width: '18rem', backgroundColor:"#17a2b8"}}>
      <Card.Body >Total Earning 70000</Card.Body>
    </Card>
    </div>
    <div>
    <Card style={{ width: '18rem', backgroundColor:"#dc3545"}}>
      <Card.Body >Total Earning 70000</Card.Body>
    </Card>
    </div>
    </div> */}
   </div>
    


      <Modal
   show={modalShow}
   onHide={() => setModalShow(false)}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Table no 1
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Pax</InputGroup.Text>
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={()=>handleClose()}>Occupy</Button>
        <Button onClick={()=>handleClose()}>Close</Button>
      </Modal.Footer>
    </Modal>
      </>
  );

}

export default BasicExample;
