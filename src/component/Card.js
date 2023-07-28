import './card.css';
import React, { useState } from 'react';
import Quantity from './Quantity';
function Items() {
  const [addedItems, setAddedItems] = useState([]);

  const handleAddItem = (itemName, price) => {
    const newItem = {
      itemName,
      price,
    };
    setAddedItems((prevItems) => [...prevItems, newItem]);
  };
    const total = addedItems.reduce((acc, item) => acc + item.price, 0);
  
  return (
    <>
      <div className="cont">
          <div className="left">
           <div className="cardd">
              <div className='imagee'><img src='chyang.png'  height='100px' width='100px'></img></div>
              <h3>Chyang</h3>
              <h4>Rs. 80</h4>
              <div className='count-btn'><Quantity/></div>
              <button className='item-add' onClick={() => handleAddItem('Chyang', 80)}>Add</button>
           </div>
           <div className="cardd">
              <img src='yomari.png'  height='100px' width='100px'></img>
              <h3>Yomari</h3>
              <h4>Rs.120</h4>
              <Quantity/>
              <button className='item-add' onClick={() => handleAddItem('Yomari', 100)}>Add</button>
           </div>
           <div className="cardd">
              <img src='sapu-mhicha.png'  height='100px' width='100px'></img>
              <h3>SafuMhicha</h3>
              <h4>Rs. 100</h4>
              <Quantity/>
              <button className='item-add' onClick={() => handleAddItem('Safu Mhicha', 100)}>Add</button>
           </div>
           <div className="cardd">
             <div>< img src='samey.jpg'  height='100px' width='100px' alt="" className="image"/></div> 
              <h3>Samey baji</h3>
              <h4>Rs.300</h4>
              <Quantity/>
              <button className ='item-add' onClick={() => handleAddItem('Samey Baji', 300)}>Add</button>
           </div>
           <div className="cardd">
              <img src='momo2.png' height='100px' width='100px'></img>
              <h3>MO:MO</h3>
              <h4>Rs. 150</h4>
              <Quantity/>
              <button className ='item-add' onClick={() => handleAddItem('MO:MO', 150)}>Add</button>
           </div>
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
              {addedItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.itemName}</td>
                  <td><Quantity/></td>
                  <td>{`Rs ${item.price}`}</td>
                  
                </tr>
                
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total</td>
                <td>{ `Rs ${total}`}</td>
              </tr>
            </tfoot>
          </table>
          </div>
      </div>
    </>
  );
}
export default Items;