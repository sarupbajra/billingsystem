import React from "react";
import { useParams } from "react-router-dom";
export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { total } = props;
  const { tableId } = useParams();
  const billData =
    JSON.parse(localStorage.getItem(`billData_${tableId}`)) || [];
  return (
    <div ref={ref}>
      <h2>Bill for Table {tableId}</h2>
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
            <td>{`Rs ${total}`}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});
// '../component/PrintBill.js'

export default ComponentToPrint;
