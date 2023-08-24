import React, { useState, useEffect, useRef } from "react";
import { tableDetailInfo, foodMenuItem } from "../utils/TableInfo";
import { useNavigate, useParams } from "react-router-dom";
import Quantity from "../component/Quantity";
import "../pages/card.css";
import { FaUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import foodMenuSlice from "../redux/TableDetail/foodMenu.slice";
import FoodItemsPage from "./FoodItemsPage";
import { Link } from "react-router-dom";
import { addFoodItem } from "../redux/foodMenu.slice";
import {
  addItem,
  removeItem,
  updateQuantity,
} from "../redux/TableDetail/orderTable.slice";
import FoodItemCard from "../component/FoodItemCard";
// import UploadAndDisplayImage from "../component/imageUpload";

function AddOrderPage() {
  const foodItemsList = JSON.parse(localStorage.getItem("foodItemsList")) || [];
  const getLocalItems = () => {
    const orderTable = localStorage.getItem("orderTables");
    return orderTable ? JSON.parse(orderTable) : {};
  };
  const menuList = JSON.parse(localStorage.getItem("menuList") || "[]");
  const getFoodItemFromMenuList = JSON.parse(
    localStorage.getItem("foodItems") || "[]"
  );
  const [tables, setTables] = useState(tableDetailInfo);
  const { tableId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [foodMenuList, setFoodMenuList] = useState([]);
  const [orderTables, setOrderTables] = useState(getLocalItems());
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodPrice, setNewFoodPrice] = useState(0);
  const [image, setImage] = useState();

  const orderData = useSelector((state) => state.foodMenu.orderTables);
  const [foodItems, setFoodItems] = useState(getLocalItems());
  console.log("newwewew", tableId, orderData);
  const ids = orderTables[tableId]?.items.map(({ itemId }) => itemId);
  const filtered = orderTables[tableId]?.items.filter(
    ({ itemId }, index) => !ids.includes(itemId, index + 1)
  );
  console.log("filter", filtered);
  useEffect(() => {
    //   // Save order data to local storage whenever it changes
    //   localStorage.setItem("orderTables", JSON.stringify(orderTables));
    //   const getFoodItemFromMenuList =
    //     JSON.parse(localStorage.getItem("foodItems")) || [];
    const menuList = JSON.parse(localStorage.getItem("menuList")) || [];
    const getFoodItemFromMenuList = getLocalItems();
    //  const menuList = localStorage.getItem("foodItems");

    //   console.log("menulist", menuList);
  }, [orderTables]);
  //   setOrderTables(getLocalItems());
  // }, []);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };
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
    dispatch(removeItem({ tableId, index }));
  };
  const handleAddFoodItem = (foodItem) => {
    // setSelectedItems((prevSelectedItems) => [...prevSelectedItems, foodItem]);
    if (newFoodName && newFoodPrice > 0) {
      const newFoodItem = {
        id: Date.now(), // Generate a unique ID (you can use a library for better IDs)
        foodName: newFoodName,
        price: newFoodPrice,
      };

      setFoodItems((prevFoodItems) => [...prevFoodItems, newFoodItem]);

      // Clear input fields
      setNewFoodName("");
      setNewFoodPrice(0);
    }
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  // const handleUploadFileChange = async (e) => {
  //   const selectedFile = e.target.files[0];

  //   if (selectedFile) {
  //     try {
  //       const base64String = await convertBase64(selectedFile);
  //       // Now you can use the base64String for your intended purpose
  //       // For example, you can update the state or perform any other actions.
  //     } catch (error) {
  //       console.error("Error converting file to base64:", error);
  //     }
  //   }
  // };

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
        // Dispatch the addItem action with relevant payload
        dispatch(
          addItem({
            tableId,
            item: newItem,
          })
        );
        return { ...prevTables, [tableId]: updatedTable };
      }
    });
  };

  const handleGenerateBill = () => {
    console.log("Generating bill for table:", tableId);
    // Store the order data for the current table in local storage
    localStorage.setItem(
      `billData_${tableId}`,
      JSON.stringify(orderTables[tableId]?.items)
    );
    // Navigate to the billing page for the current table
    navigate(`/billing/${tableId}`);
  };
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
    dispatch(updateQuantity({ tableId, index, quantity }));
  };

  // const calculateItemCost = (price, quantity) => price * quantity;
  const total = (tableId) =>
    orderTables[tableId]?.items.reduce((acc, item) => acc + item.cost, 0) || 0;
  // const total = orderData.reduce((acc, item) => acc + item.price, 0) || 0;
  console.log("total", orderData);
  const handleImageClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <div className="table-heading">{`Table No: ${tableId}`} </div>
      <div className="cont">
        <div className="left">
          {getFoodItemFromMenuList.map((foodItem, index) => (
            <div className="cardd" key={index}>
              <div className="imagee">
                {/* <img
                  // src={foodItem.src}
                  src={UploadAndDisplayImage}
                  height="100px"
                  width="100px"
                  alt={foodItem.name}
                /> */}

                <div onClick={() => handleImageClick()}>
                  {image ? (
                    <img src={URL.createObjectURL(image)} alt="menuItem.name" />
                  ) : (
                    <img
                      src="foodItem.src"
                      height="100px"
                      width="100px"
                      alt="menuItem.name"
                    />
                  )}

                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    alt=""
                  />
                </div>
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
          {menuList.map((menuItem, index) => (
            <div className="cardd" key={index}>
              {/* Render menu item details */}
              <div className="imagee">
                <div onClick={handleImageClick}>
                  <img src={menuItem.src} alt="menuItem.name" />
                  <input type="file" ref={inputRef} />
                </div>
                {/* <img
                  // src={menuItem.imageSrc}
                  src={UploadAndDisplayImage}
                  height="100px"
                  width="100px"
                  alt={menuItem.name}
                /> */}
              </div>
              <h3>{menuItem.name}</h3>
              <h3>Rs {menuItem.price}</h3>

              {/* Add button to add the menu item to the order */}
              <button
                className="item-add"
                onClick={() =>
                  handleAddItem(tableId, menuItem.name, menuItem.price, 1)
                }
              >
                Add
              </button>
            </div>
          ))}
        </div>

        <div className="right">
          <div className="manage-item">
            <Link to="/food-items">Manage Food Items</Link>
          </div>
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
                <td>
                  <button onClick={handleGenerateBill}>Generate Bill</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {/* <div className="add-food-item">
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
      </div> */}
    </>
  );
}

export default AddOrderPage;
