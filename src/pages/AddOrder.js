import React, { useState, useEffect } from "react";
import { tableDetailInfo, foodMenuItems } from "../utils/TableInfo";
import { useNavigate, useParams } from "react-router-dom";
import Quantity from "../component/Quantity";
import "../pages/card.css";
import { useDispatch, useSelector } from "react-redux";
import foodMenuSlice from "../redux/TableDetail/foodMenu.slice";
function AddOrderPage() {
  const [tables, setTables] = useState(tableDetailInfo);
  const { tableId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [foodMenuList, setFoodMenuList] = useState([]);
  const [orderTables, setOrderTables] = useState({});
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodPrice, setNewFoodPrice] = useState(0);

  const handleAddNewFoodItem = () => {
    if (newFoodName && newFoodPrice > 0) {
      const newFoodItem = {
        foodName: newFoodName,
        price: newFoodPrice,
        // Add other properties as needed
      };

      setFoodMenuList((prevFoodMenuList) => [...prevFoodMenuList, newFoodItem]);

      // Clear input fields
      setNewFoodName("");
      setNewFoodPrice(0);
    }
  };
  // const foodMenuStore = useSelector((state) => state.foodMenu.foodMenuItems);
  // const menuItems = useSelector((state) => state.foodMenu.foodMenuItems);
  // const orderTables =useSelector((state)=> state.orderTables);
  useEffect(() => {
    // Load order data from local storage when the component mounts
    //
    //   dispatch(foodMenuSlice.actions.loadOrderTables());
    // }, [dispatch]);
    const storedOrderTables =
      JSON.parse(localStorage.getItem("orderTables")) || {};
    setOrderTables(storedOrderTables);
  }, []);
  useEffect(() => {
    // Save order data to local storage whenever it changes
    localStorage.setItem("orderTables", JSON.stringify(orderTables));
  }, [orderTables]);
  //   dispatch(foodMenuSlice.actions.saveOrderTables(orderTables));
  // }, [dispatch, orderTables]);

  const handleRemoveItem = (tableId, index) => {
    setOrderTables((prevTables) => {
      const updatedTable = {
        ...prevTables[tableId],
        items: prevTables[tableId].items.filter((item, i) => i !== index),
      };
      return {
        ...prevTables,
        [tableId]: updatedTable,
      };
    });
  };

  const handleAddItem = (tableId, itemName, price, quantity) => {
    setOrderTables((prevTables) => {
      const tableData = prevTables[tableId] || { items: [] };

      // Check if the item already exists in the tableData's items
      const existingItem = tableData.items.find(
        (item) => item.itemName === itemName
      );

      if (existingItem) {
        // If the item exists, update its quantity
        const updatedItems = tableData.items.map((item) =>
          item.itemName === itemName
            ? {
                ...item,
                quantity: item.quantity + quantity,
                cost: item.price * (item.quantity + quantity),
              }
            : item
        );
        const updatedTable = { ...tableData, items: updatedItems };
        return { ...prevTables, [tableId]: updatedTable };
      } else {
        // If the item doesn't exist, add it to the items list
        const newItem = {
          itemName,
          price,
          quantity,
          cost: price * quantity,
        };
        const updatedItems = [...tableData.items, newItem];
        const updatedTable = { ...tableData, items: updatedItems };
        return { ...prevTables, [tableId]: updatedTable };
      }
    });
  };

  // const handleGenerateBill = () => {
  //   console.log("Generating bill for table:", tableId);
  //   // Store the order data for the current table in local storage
  //   localStorage.setItem(
  //     `billData_${tableId}`,
  //     JSON.stringify(orderTables[tableId]?.items)
  //   );
  //   // Navigate to the billing page for the current table
  //   navigate(`/billing/${tableId}`);
  // };
  const handleQuantityChange = (tableId, index, quantity) => {
    setOrderTables((prevTables) => {
      const updatedTable = {
        ...prevTables[tableId],
        items: prevTables[tableId].items.map((item, i) =>
          i === index
            ? { ...item, quantity, cost: item.price * quantity }
            : item
        ),
      };
      updatedTable.items = updatedTable.items.filter(
        (item) => item.quantity > 0
      );
      return {
        ...prevTables,
        [tableId]: updatedTable,
      };
    });
  };

  const calculateItemCost = (price, quantity) => price * quantity;

  const total = (tableId) =>
    orderTables[tableId]?.items.reduce((acc, item) => acc + item.cost, 0) || 0;

  return (
    <>
      <div className="table-heading">{`Table No: ${tableId}`} </div>
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

              <button
                className="item-add"
                onClick={() =>
                  handleAddItem(tableId, foodItem.foodName, foodItem.price, 1)
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
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {orderTables[tableId]?.items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.itemName}</td>
                  <td>
                    <Quantity
                      value={item.quantity}
                      onChange={(quantity) =>
                        handleQuantityChange(tableId, index, quantity)
                      }
                    />
                  </td>
                  <td>{`Rs ${item.price}`}</td>
                  <td>{`Rs ${item.cost}`}</td>
                  <td>
                    <div
                      className="remove-btn"
                      onClick={() => handleRemoveItem(tableId, index)}
                    >
                      Remove
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">Total</td>
                <td>{`Rs ${total(tableId)}`}</td>
                <td></td>
                {/* <td>
                  <button onClick={handleGenerateBill}>Generate Bill</button>
                </td> */}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="add-food-item">
        <h3>Add New Food Item</h3>
        <input
          type="text"
          placeholder="Food Name"
          value={newFoodName}
          onChange={(e) => setNewFoodName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={newFoodPrice}
          onChange={(e) => setNewFoodPrice(parseFloat(e.target.value))}
        />
        <button onClick={handleAddNewFoodItem}>Add Item</button>
      </div>
    </>
  );
}

export default AddOrderPage;
