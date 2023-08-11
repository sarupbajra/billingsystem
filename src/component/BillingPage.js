// BillingPage.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BillingPage = () => {
  const { tableId } = useParams();
  const [billData, setBillData] = useState([]);

  useEffect(() => {
    // Load the order data for the current table from local storage when the component mounts
    const storedBillData =
      JSON.parse(localStorage.getItem(`billData_${tableId}`)) || [];
    setBillData(storedBillData);
  }, [tableId]);

  // Calculate the total cost for the bill
  const total = billData.reduce((acc, item) => acc + item.cost, 0);

  return (
    <div>
      <h2>Bill for Table {tableId}</h2>
      <table>
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
            <td>{`Rs ${total}`}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default BillingPage;
