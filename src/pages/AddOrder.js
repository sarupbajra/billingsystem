import "../pages/card.css";
import React, { useState } from "react";
import { tableDetailInfo, foodMenuItems } from "../utils/TableInfo";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function AddOrderPage() {
  const [addedItems, setAddedItems] = useState([]);
  const [tables, setTables] = useState(tableDetailInfo);
  const navigate = useNavigate();
  const handleRemoveItem = (index) => {
    setAddedItems((prevItems) => prevItems.filter((item, i) => i !== index));
  };

  const [searchParams] = useSearchParams();

  const tableNumber = searchParams.get("table");

  const handleAddItem = (itemName, price, tableNo) => {
    const newItem = {
      itemName,
      price,
    };
    setAddedItems((prevItems) => [...prevItems, newItem]);
  };

  const total = addedItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <div className="table-heading">{`Table No: ${tableNumber}`} </div>
      <div className="cont">
        <div className="left">
          {foodMenuItems.map((foodItem, index) => (
            <div className="cardd" key={index}>
              <div className="imagee">
                <img
                  src={foodItem.src}
                  height="100px"
                  width="100px"
                  alt={foodItem.name}
                />
              </div>
              <h3>{foodItem.foodName}</h3>
              <h3>Rs {foodItem.price}</h3>
              {/* In the onClick event, pass the table number where the item is added */}
              <button
                className="item-add"
                onClick={() =>
                  handleAddItem(foodItem.foodName, foodItem.price, 1)
                }
              >
                Add
              </button>
            </div>
          ))}
        </div>

        <div className="right">
          <table className="item-table">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Item Name</th>
                {/* <th>Qty</th> */}
                <th>Price</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {addedItems.map((itemName, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{itemName.itemName}</td>

                  <td>{`Rs ${itemName.price}`}</td>
                  <td>
                    <div
                      className="remove-btn"
                      button
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total</td>
                <td>{`Rs ${total}`}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}

export default AddOrderPage;
