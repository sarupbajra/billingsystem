
import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import VaccantIcon from "../assets/Icons/vacant.png";


import './Home.css'
import Cardlist  from '../component/Cardlist';

  
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
  

        <Cardlist/>
  

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
