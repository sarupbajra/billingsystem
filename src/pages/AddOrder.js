import '../pages/card.css';
import React, { useState } from 'react';
import { tableDetailInfo,foodMenuItems} from "../utils/TableInfo";



function AddOrderPage() {
  const [addedItems, setAddedItems] = useState([]);
  const [tables, setTables] = useState(tableDetailInfo);




  const handleAddItem = (itemName, price, tableNo) => {
    const newItem = {
      itemName,
      price,
    };
    setAddedItems((prevItems) => [...prevItems, newItem]);

    // Update the table status to 'occupied'
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.tableNo === tableNo ? { ...table, status: 'occupied' } : table
      )
    );
  };

  const total = addedItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <div className="cont">
        <div className="left">
          {foodMenuItems.map((foodItem, index) => (
            <div className="cardd" key={index}>
              <div className='imagee'>
             
                 <img src={foodItem.src} height='100px' width='100px' alt={foodItem.name} />
          

              </div>
              <h3>{foodItem.foodName}</h3>
              <h4>Rs {foodItem.price}</h4>
              {/* In the onClick event, pass the table number where the item is added */}
              <button className='item-add' onClick={() => handleAddItem(foodItem.name, foodItem.price, 1)}>Add</button>
            </div>
          ))}
        </div>

        <div className="right">
          <table className='item-table'>
            <thead>
              <tr>
                <th>S.N</th>
                <th>Item Name</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {addedItems.map((itemName, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{itemName.foodName}</td>
                  {/* Display quantity selection component here */}
                  {/* <td><Quantity/></td> */}
                  <td></td>
                  <td>{`Rs ${itemName.price}`}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total</td>
                <td></td>
                <td>{`Rs ${total}`}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="table-info">
        <h2>Table Details</h2>
        <table>
          <thead>
            <tr>
              <th>Table No.</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table.tableNo}>
                <td>{table.tableNo}</td>
                <td>{table.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AddOrderPage;
