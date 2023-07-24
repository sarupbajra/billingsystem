import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {tableDetailInfo} from "../utils/TableInfo"
import VaccantIcon from "../assets/Icons/vacant.png";
import Modal from 'react-bootstrap/Modal';
import OccupiedIcon from "../assets/Icons/occupied.png";
import { useHistory } from 'react-router-dom';
import '../pages/Home.css';
import { withRouter } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// const cardData =[
//   {
//     id: 1,
//     title:'Table T1',  
//     subtitle: 'Subtitle 1',
//     content: 'pax 3',
//   },
//   {
//     id: 1,
//     title:'Card 2',
//     subtitle: 'Subtitle 2',
//     content: 'quick examples',
//   },
//   {
//     id: 1,
//     title:'Card 2',
//     subtitle: 'Subtitle 2',
//     content: 'pax',
//   },
//   {
//     id: 1,
//     title:'Card 2',
//     subtitle: 'Subtitle 2',
//     content: 'pax',
//   },

// ]
// function Cardlist(props) {
//   // const history = useHistory();
//   const [show, setShow] = useState(false);
//   const [selectedCard, setSelectedCard]= useState();
//   const handleClose = () => setShow(false);
//   const handleShow = (card) => {
//     setSelectedCard(card);
//     setShow(true);
//   };
//   const handleAddOrder = (tableNo) =>{
//     props.history.push('/Reports?table=${tableNo}')
//   };
//   return (
   
//    <div className='contain-occupied'>

{/* {cardData.map((card) => (
    
    <Card key={card.id} className='occupied-card-container' style={{ width: '18rem' }}>
   
   <Card.Body>
      <Card.Title>{card.title}</Card.Title>
      <div className='occupied-icon'><img alt= "occupy" src={OccupiedIcon} width="50" height="50" style={{marginRight:"5px"}}/>
   
      <Button className="add-item-btn" onClick={()=>handleShow(card)}>Add Order</Button>
      <Button className="add-item-btn" onClick={()=>handleShow(card)}>View</Button>
      <Card.Text>
        </Card.Text></div>
        <div>bill status:pending</div>
        
    </Card.Body>
   
  </Card>

))} */}







// {tableDetailInfo && tableDetailInfo.map((tableDetail,index) => (
    
//     <Card key={index} className='occupied-card-container' style={{ width: '18rem' }}>
   
//    <Card.Body>
//       <Card.Title>{`table no ${tableDetail.tableNo}`}</Card.Title>
//       <div><div className='occupied-icon'>
//         {tableDetail.status === "occupied"? (<img alt= "occupy" src={OccupiedIcon} width="50" height="50" style={{marginRight:"5px"}}/> ) : (<img alt= "occupy" src={VaccantIcon} width="50" height="50" style={{marginRight:"5px"}}/>)}
   
//     { tableDetail.status === "occupied"? ( <> <Button className="add-item-btn" onClick={()=>handleShow(tableDetail.tableNo)} >Add Order</Button>
//       <Button className="add-item-btn" onClick={()=>handleShow(tableDetail.tableNo)}>View</Button>
//       {/* </div> */}
//       </> ):     <Button className="add-item-btn" onClick={()=>handleAddOrder(tableDetail.tableNo)}>Add Occupy Table</Button>}
//      </div><div>bill status:pending</div>
//         </div>
        
//     </Card.Body>
   
//   </Card>

// ))}
















   {/* {cardData.map((card,index) => (
    
    <Card key={index} className='card-container' style={{ width: '18rem' }}>
   
   <Card.Body>
      <Card.Title>{card.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Orders <button className='item-btn'>Add items</button></Card.Subtitle>
      <Card.Text>
        {card.content}<button>View</button>
      </Card.Text>
      <Card.Text>Bill Status <button>pending</button></Card.Text>
    </Card.Body>
   
  </Card> */}
  
 
//    </div>


      
   
//   );

// }

// export default withRouter(Cardlist);

// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { tableDetailInfo } from "../utils/TableInfo";
// import VaccantIcon from "../assets/Icons/vaccant.png";
// import Modal from 'react-bootstrap/Modal';
// import OccupiedIcon from "../assets/Icons/occupied.png";
// import '../pages/Home.css';
// import { useHistory } from 'react-router-dom';

const cardData = [
  // const cardData =[
   {
     id: 1,
        title:'Table T1',  
        subtitle: 'Subtitle 1',
        content: 'pax 3',
      },
      {
        id: 1,
        title:'Card 2',
        subtitle: 'Subtitle 2',
        content: 'quick examples',
      },
      {
        id: 1,
        title:'Card 2',
        subtitle: 'Subtitle 2',
        content: 'pax',
      },
      {
        id: 1,
        title:'Card 2',
        subtitle: 'Subtitle 2',
        content: 'pax',
      },
    
    
];

function Cardlist() {
  const [modalShow, setModalShow] = React.useState(false);
  const [show, setShow] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [isOccupied, setIsOccupied] = useState(false); 
  const handleClose = () => setShow(false);
  const handleShow = (card) => {
    setSelectedCard(card);
    setShow(true);
    setModalShow(true);
  };

  // const history = useHistory();
  

  const handleAddOrder = (tableNo) => {
    const navigate = useNavigate;
    // Navigate to the report page with the table number as a parameter
    navigate(`/fooditems?table=${tableNo}`);
  };
 

  const handleOccupy = () => {
    // If the table is not occupied, occupy it; otherwise, mark it as vacant
    setIsOccupied((prevIsOccupied) => !prevIsOccupied);
    handleClose();
  };

  return (
    <div className='contain-occupied'>
      {tableDetailInfo.map((tableDetail, index) => (
        <Card key={index} className='occupied-card-container' style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{`table no ${tableDetail.tableNo}`}</Card.Title>
            <div>
              <div className='occupied-icon'>
                {tableDetail.status === "occupied" ? (
                  <img alt="occupied" src={OccupiedIcon} width="50" height="50" style={{ marginRight: "5px" }} />
                ) : (
                  <img alt="vaccant" src={VaccantIcon} width="50" height="50" style={{ marginRight: "5px" }}  />
                  
                )}
                {tableDetail.status === "occupied" ? ( isOccupied ? (
                  <>
                  <div className=''>
                     <Button className="add-item-btn" onClick={() => handleAddOrder("/fooditem")}>  
                    {/* /*handleAddOrder(tableDetail.tableNo) */ }
                      Add Order
                    </Button>
                    <Button className="add-item-btn" onClick={() => handleShow(tableDetail)}>
                      View
                    </Button></div>
                  </>
                ) : (
                  
                  <Button className="add-item-btn" onClick={() => handleShow(tableDetail)}> 
                  Add Occupy Table
                </Button>
                
                )
                ) : (
                  
                  <Button className="add-item-btn" onClick={() => handleShow(tableDetail)}>
                    Add Occupy Table
                  </Button>
                  
                  )    
                }
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
        {isOccupied ?(
          <Button onClick={handleOccupy}>Occupied</Button>
        ) : (
      <Button onClick={()=>handleOccupy()}>Occupy</Button>
      )}
        <Button onClick={()=>handleClose()}>Close</Button>

      </Modal.Footer>
    </Modal>
              <div>bill status: pending</div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Cardlist;
