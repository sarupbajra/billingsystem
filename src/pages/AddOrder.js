import '../pages/card.css';
import React, { useState } from 'react';
import { tableDetailInfo,foodMenuItems} from "../utils/TableInfo";
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
// import { addProducts } from '../TableDetail/tabledetail.slice';
// import { useDispatch, useSelector } from 'react-redux';
// import { tableDetailSlice } from "../redux/TableDetail/tabledetail.slice";


function AddOrderPage() {
  const [addedItems, setAddedItems] = useState([]);
  const [tables, setTables] = useState(tableDetailInfo);
  const navigate = useNavigate();
  const handleRemoveItem = (index) => {
    setAddedItems((prevItems) => prevItems.filter((item, i) => i !== index));
  };

  // const dispatch = useDispatch()
  //  const foodDetailStore = useSelector(
  //    (state) => state.tableDetail.foodDetailInfo
  // );
  

  const [searchParams] = useSearchParams()

  const tableNumber = searchParams.get('table')

  const handleAddItem = (itemName, price, tableNo) => {
   
    const newItem = {
      itemName,
      price,
    };
    // const updatedAddFoods = foodDetailStore.map((newItem))
    setAddedItems((prevItems) => [...prevItems, newItem]);
    // dispatch(addProducts(newItem))
    //  dispatch(tableDetailSlice.actions.updateFoodDetail(updatedAddFoods))


    // navigate(`/table/${tableNo}`);

    // Update the table status to 'occupied'
    // setTables((prevTables) =>
    //   prevTables.map((table) =>
    //     table.tableNo :table
    // === tableNo ? { ...table, status: 'occupied' } : table
      //  )
    // );
  };

  const total = addedItems.reduce((acc, item) => acc + item.price, 0);
  
  
  return (
    <>
      <div className='table-heading'>{`Table No: ${tableNumber}`} </div>
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
              <button className='item-add' onClick={() => handleAddItem(foodItem.foodName, foodItem.price, 1)}>Add</button>
            </div>
          ))}
        </div>

        <div className="right">
          <table className='item-table'>
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
                  {/* Display quantity selection component here */}
                  {/* <td><Quantity/></td> */}
                  {/* <td></td> */}
                  <td>{`Rs ${itemName.price}`}</td>
                  <td>
                  <div className='remove-btn' button onClick={() => handleRemoveItem(index)}>Remove</div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total</td>
                {/* <td></td> */}
                <td>{`Rs ${total}`}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* <div className="table-info">
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
      </div> */}
    </>
  );
}

export default AddOrderPage;
