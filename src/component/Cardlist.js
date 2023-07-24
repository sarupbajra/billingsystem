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
const cardData = [
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
  const navigate = useNavigate();
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
  const handleAddOrder = (tableNo) => {
    navigate(`/fooditems?table=${tableNo}`);
  };
 

  const handleOccupy = () => {
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
    > <div className='Modal'>
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

      </Modal.Footer></div>
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
