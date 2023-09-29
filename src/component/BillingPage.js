// BillingPage.js

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../pages/card.css";
import ComponentToPrint from "../component/PrintBill";
import { useReactToPrint } from "react-to-print";
const BillingPage = () => {
  const [item, setItem] = useState([]);
  const [orderTables, setOrderTables] = useState({});
  const { tableId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the orderTables data or initialize it from localStorage
    const storedOrderTables =
      JSON.parse(localStorage.getItem("orderTables")) || {};
    setOrderTables(storedOrderTables);
  }, []);

  const billData =
    JSON.parse(localStorage.getItem(`billData_${tableId}`)) || [];
  const componentRef = useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Calculate the total cost for the bill
  const total =
    orderTables[tableId]?.items.reduce((acc, item) => acc + item.cost, 0) || 0;

  let totalBill = 0; // Initialize the total bill outside the loop

  orderTables[tableId]?.items.forEach((el) => {
    console.log(el);
    const billedItem = el.price * el.quantity;
    totalBill += billedItem; // Accumulate the billedItem values
  });

  console.log("bill", totalBill);

  console.log("..", orderTables[tableId]);
  console.log("..", total);

  const handlePayment = (tableNo) => {
    // Clear the order list for the current table in local storage
    localStorage.removeItem(`orderTables_${tableId}`);
    localStorage.removeItem(`billData_${tableId}`);

    const updatedTableDetail =
      JSON.parse(localStorage.getItem("tableDetailInfo")) || [];
    const updatedTableIndex = updatedTableDetail.findIndex(
      (table) => table.tableNo === tableNo
    );

    if (updatedTableIndex !== -1) {
      updatedTableDetail[updatedTableIndex].status = "vacant";
      localStorage.setItem(
        "tableDetailInfo",
        JSON.stringify(updatedTableDetail)
      );
    }
    // Create a billing record
    const billingRecord = {
      date: new Date().toISOString(),
      tableId,
      totalAmount: total,
      orderedItems: orderTables[tableId]?.items || [],
    };

    // Store the billing record in local storage
    const billingRecords =
      JSON.parse(localStorage.getItem("billingRecords")) || [];
    billingRecords.push(billingRecord);
    localStorage.setItem("billingRecords", JSON.stringify(billingRecords));

    // Redirect to the dashboard or another appropriate page
    navigate("/dashboard");
  };

  const handlePrint = () => {
    handleReactToPrint();
  };

  return (
    <div className="bill-table">
      <div className="">
        {total !== 0 ? (
          <div>
            <button className="pay-the-bill" onClick={handlePrint}>
              Print
            </button>
            <button className="pay-the-bill" onClick={handlePayment}>
              Pay Bill
            </button>
          </div>
        ) : (
          "Please add a product"
        )}
      </div>
      <h2>Bill for Table {tableId}</h2>
      <div style={{ display: "none" }}>
        <ComponentToPrint
          total={total}
          billData={billData}
          ref={componentRef}
        />
      </div>
      <table className="item-table bg-dark">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {billData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>{`Rs ${item.price}`}</td>
              <td>{`Rs ${item.cost}`}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total</td>
            <td>{`Rs ${totalBill}`}</td>
          </tr>
        </tfoot>
      </table>
      <div>
        <h1>Billing Page for Table {tableId}</h1>
        {/* Display billing details and total amount here */}
        {/* <button onClick={handlePayment}>Pay Bill</button> */}
      </div>
    </div>
  );
};

export default BillingPage;
