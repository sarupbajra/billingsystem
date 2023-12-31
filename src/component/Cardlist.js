import React,{useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {tableDetailInfo} from "../utils/TableInfo"
import VaccantIcon from "../assets/Icons/vacant.png";
import Modal from 'react-bootstrap/Modal';
import OccupiedIcon from "../assets/Icons/occupied.png";
import '../pages/Home.css';

// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector} from 'react-redux';

function Cardlist() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [show, setShow] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [paxNumber, setPaxNumber] = useState();
  const [isOccupied, setIsOccupied] = useState(false); 
  const [selectedTable, setSelectedTable] = useState();
  const [tableDetailList, setTableDetailList] = useState([]);
  const tableList =useSelector ((state) => state.table);
  const dispatch = useDispatch();
//   const cardData = [
//     {
//       id: 1,
//          title:'Table T1',  
//          subtitle: 'Subtitle 1',
//          content: 'pax 3',
//        },
//        {
//          id: 2,
//          title:'Table T2',
//          subtitle: 'Subtitle 2',
//          content: 'quick examples',
//        },
//        {
//          id: 3,
//          title:'Table T3',
//          subtitle: 'Subtitle 3',
//          content: 'pax',
//        },
//        {
//          id: 4,
//          title:'Table T4',
//          subtitle: 'Subtitle 4',
//          content: 'pax',
//        },
//        {
//         id: 5,
//          title:'Table T5',
//          subtitle: 'Subtitle 5',
//          content: 'pax',
//        }
     
     
//  ];

  useEffect(() => {
    tableDetailInfo.tableNo = `tableDetail ${paxNumber}`;
    setTableDetailList(tableDetailInfo);
  }, 
   [paxNumber]);
  const handleClose = () => setShow(false);
  const handleShow = (card) => {

    setSelectedTable(card)
    dispatch(selectedTable(card));
    console.log("card",card.tableNo);
    // tableDetailInfo.map((tabledetail)=>{
      
    // })

    setSelectedCard(card);
    dispatch(selectedCard(card))
    setShow(true);
    setModalShow(true);
  };
  const handleAddOrder = (tableNo) => {
    navigate(`/fooditems?table=${tableNo}`);
  };
 

  const handleOccupy = () => {
    const updatedTableList = tableDetailList.map((table) => 
       table.tableNo === selectedTable.tableNo 
      ? {
          ...table,
          status: "occupied",
          pax: paxNumber,
          billStatus: "pending",
        }
       
        : table
      
    );
    setTableDetailList(updatedTableList);
    setModalShow(false);
  };
  return (
    <div className='contain-occupied'>
      {tableDetailList.map((tableDetail, index) => (
        <Card key={index} className={`${tableDetail.status === "occupied" ? "occupied-card-container" : "unoccupied-card-container"} card-container `} style={{ width: '18rem' }}>
          <Card.Body>
            
            <Card.Title> {`Table No: ${tableDetail.tableNo}`} </Card.Title>
            <div>
              <div className='occupied-icon'>
                {tableDetail.status === "occupied" ? (
                  <img alt="occupied" src={OccupiedIcon} width="50" height="50" style={{ marginRight: "5px" }} />
                ) : (
                  <img alt="vaccant" src={VaccantIcon} width="50" height="50" style={{ marginRight: "5px" }}  />
                  
                )}
                {tableDetail.status === "occupied" ?  (
                  <>
                  <div className='card-contain'>
                     <Button className="add-item-btn" onClick={() => handleAddOrder("/fooditem")}>  
                    {/* /*handleAddOrder(tableDetail.tableNo) */ }
                      Add Order
                    </Button>
                    <Button className="add-item-btn" onClick={() => handleShow(tableDetail)}>
                      View
                    </Button>
                   
                  </div>
                   <Card.Footer><div className='bill-status'>{`billing status: ${tableDetail.billStatus}`}</div></Card.Footer>
                  </>
                ) : (
                <div className='add-occupy-btn'>
                  <Button className="add-occupy-btn" onClick={() => handleShow(tableDetail)}> 
                  Add Occupy Table
                </Button>
                </div>
                
                )}
                <div>
                  
                  
                </div>
                
     
                  
              </div>
              
              {/* <div>bill status: pending</div> */}
            </div>
            
          </Card.Body>
        </Card>
      ))}

<Modal
   show={modalShow}
   onHide={() => setModalShow(false)}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    > <div className='Modal'>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {selectedTable && `Table No ${selectedTable.tableNo}`}


        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Pax</InputGroup.Text>
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          // value={this.state.val}
          onChange={(e)=> setPaxNumber(e.target.value)}
        />
      </InputGroup>
      </Modal.Body>
      <Modal.Footer>
  
          <Button onClick={handleOccupy}>Occupied</Button>
        
        <Button onClick={handleClose}>Close</Button>

      </Modal.Footer>
      </div>
    </Modal>
    </div>
  );
}


export default Cardlist;
