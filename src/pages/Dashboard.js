import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
  tableDetailSlice,
  updateTableDetail,
} from "../redux/TableDetail/tabledetail.slice";
import InputGroup from "react-bootstrap/InputGroup";
import { tableDetailInfo } from "../utils/TableInfo";
import { useNavigate } from "react-router-dom";
import VaccantIcon from "../assets/Icons/vaccant2.png";
import OccupiedIcon from "../assets/Icons/occupy.png";
import "./Home.css";
import Navbar from "../component/Navbar";
// import AddOrderPage from './AddOrder';

function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableDetailStore = useSelector(
    (state) => state.tableDetail.tableDetailInfo
  );
  // const tableNumbers= [1,2,3,4];

  const [viewModalShow, setViewModalShow] = useState(false); // Modal for viewing table info
  const [selectedTableByUser, setSelectedTableByUser] = useState();
  const [isBillPaid, setIsBillPaid] = useState(false);
  const [isBillPending, setIsBillPending] = React.useState(false);
  const [occupyModalShow, setOccupyModalShow] = useState(false); // Modal for occupation
  const [pendingModalShow, setPendingModalShow] = useState(false); // Modal for pending bill
  const [modalShow, setModalShow] = React.useState(false);
  const [show, setShow] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [paxNumber, setPaxNumber] = useState();
  const [selectedTable, setSelectedTable] = useState();
  const [tableDetailList, setTableDetailList] = useState([]);
  // const tableList =useSelector ((state) => state.table);
  // const dispatch = useDispatch();

  useEffect(() => {
    tableDetailInfo.tableNo = `tableDetail ${paxNumber}`;
    setTableDetailList(tableDetailInfo);
  }, [paxNumber]);

  const handleClose = () => setShow(false);

  //   setShow(true);
  //   setModalShow(true);
  // };
  const handleAddOrder = (tableNo) => {
    navigate(`/addorder/${tableNo}`);
  };

  const handleOccupy = (tableNo) => {
    console.log("tabledetail", tableDetailStore);
    const updatedTableList = tableDetailStore.map((table) =>
      table.tableNo === selectedTable.tableNo
        ? {
            ...table,
            status: "occupied",
            pax: paxNumber,
            billStatus: "pending",
          }
        : table
    );
    dispatch(tableDetailSlice.actions.updateTableDetail(updatedTableList));

    setOccupyModalShow(false);
  };
  const handlePending = (tableNo) => {
    setModalShow(true);
    setPendingModalShow(true);
    setIsBillPending(true);
    setSelectedTableByUser(tableNo);
  };

  const handlePayBill = (tableNo) => {
    if (selectedTable) {
      const updatedTableList = tableDetailStore.map((table) =>
        table.tableNo === selectedTable
          ? {
              ...table,
              status: "vacant",
              pax: 0,
              billStatus: "paid",
            }
          : table
      );

      dispatch(tableDetailSlice.actions.updateTableDetail(updatedTableList));
      setPendingModalShow(false);
      setIsBillPaid(true);
      setIsBillPending(false);
    } else {
      // Handle the case where selectedTable is undefined
      console.error("selectedTable is undefined");
    }
  };
  const handleShow = (tableDetail) => {
    setSelectedTable(tableDetail);
    // dispatch(selectedTable(card))
    // setSelectedCard(card);
    // dispatch(selectedTable(card))
    // Use the appropriate state variable to show the desired modal
    if (tableDetail.status === "occupied") {
      setPendingModalShow(true);
    } else {
      setOccupyModalShow(true);
    }
  };

  const handleView = (table) => {
    setSelectedTable(table);
    setViewModalShow(true); // Show the "View" modal
  };

  return (
    <div className="contain">
      <div>
        {/* {tableNumbers.map((tableNo) => (
        <AddOrderPage key={tableNo} tableNo={tableNo} />
      ))} */}
      </div>
      <div className="contain-occupied">
        {tableDetailStore.map((tableDetail, index) => (
          <Card
            key={index}
            className={`${
              tableDetail.status === "occupied"
                ? "occupied-card-container"
                : "unoccupied-card-container"
            } card-container `}
            style={{ width: "18rem" }}
          >
            <Card.Body>
              <div>
                <div className="occupied-icon">
                  <div className="occupancy-icon">
                    {" "}
                    <Card.Title>
                      {tableDetail.status === "occupied" ? (
                        <img
                          alt="occupied"
                          src={OccupiedIcon}
                          width="50"
                          height="50"
                          style={{ marginRight: "5px" }}
                        />
                      ) : (
                        <img
                          className="vacant"
                          alt="vaccant"
                          src={VaccantIcon}
                          width="50"
                          height="50"
                          style={{ marginRight: "5px" }}
                        />
                      )}
                    </Card.Title>
                  </div>
                  <div className="card-contains">
                    <div className="table">{`Table No: ${tableDetail.tableNo}`}</div>
                    {tableDetail.status === "occupied" ? (
                      <>
                        <div className="card-contain">
                          <Button
                            className="add-item-btn"
                            onClick={() => handleAddOrder(tableDetail.tableNo)}
                          >
                            {/* /*handleAddOrder(tableDetail.tableNo) */}
                            Add Order
                          </Button>
                          <Button
                            className="add-item-btn"
                            onClick={() => handleView(tableDetail)}
                          >
                            View
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="add-occupy-btn">
                        <Button
                          className="add-occupy-btn"
                          onClick={() => handleShow(tableDetail)}
                        >
                          Table Available
                        </Button>
                      </div>
                    )}

                    {/* <div></div> */}

                    {tableDetail.status === "occupied" ? (
                      <>
                        <div className="bill-status">
                          {/* {`Billing status: ${tableDetail.billStatus}`} */}
                          Bill status:{" "}
                          {
                            <button
                              className="pending-button"
                              onClick={() => handlePending(tableDetail.tableNo)}
                            >
                              Pending
                            </button>
                          }
                        </div>
                      </>
                    ) : (
                      <> </>
                    )}
                  </div>
                </div>

                {/* <div>bill status: pending</div> */}
              </div>
            </Card.Body>
          </Card>
        ))}
        {/* <div>Pending Payment</div>
        <div>Total Earnings </div> */}

        <Modal
          show={pendingModalShow}
          onHide={() => setPendingModalShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Pending Bill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isBillPending ? (
              <p>Are you sure you want to mark the bill as paid?</p>
            ) : (
              <p>Invalid action. Bill is not pending.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            {isBillPending && <Button onClick={handlePayBill}>Pay Bill</Button>}
            <Button onClick={() => setModalShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={occupyModalShow}
          onHide={() => setOccupyModalShow(false)}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {" "}
          <div className="Modal">
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
                  onChange={(e) => setPaxNumber(e.target.value)}
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              {/* {selectedTable.billStatus === "pending" ? ( */}
              {/* <> */}
              <Button onClick={handleOccupy}>Occupied</Button>
              <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </div>
        </Modal>
        <Modal show={viewModalShow} onHide={() => setViewModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Table Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTable && (
              <div>
                <p>Table Number: {selectedTable.tableNo}</p>
                <p>Status: {selectedTable.status}</p>
                {selectedTable.status === "occupied" && (
                  <p>Number of Pax: {selectedTable.pax}</p>
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setViewModalShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default DashboardPage;
