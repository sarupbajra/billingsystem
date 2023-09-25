import React, { useState, useEffect, useRef } from "react";
// import { addFoodItem } from "../redux/foodMenu.slice"; // Adjust the path
import FoodItemCard from "../component/FoodItemCard";
import { FaUpload } from "react-icons/fa";
import { AiOutlineConsoleSql } from "react-icons/ai";
import * as AiIcons from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./card.css";
function FoodItemsPage() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const getLocalItems = () => {
    const foodItem = localStorage.getItem("foodItems");
    return foodItem ? JSON.parse(foodItem) : {};
  };
  const [foodItems, setFoodItems] = useState(getLocalItems());
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodPrice, setNewFoodPrice] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedFoodName, setEditedFoodName] = useState("");
  const [editedFoodPrice, setEditedFoodPrice] = useState("");
  const [editedImage, setEditedImage] = useState(null);
  const [image, setImage] = useState();
  const inputRef = useRef(null);
  // Load food items from localStorage on component mount
  useEffect(() => {
    const savedFoodItems = JSON.parse(localStorage.getItem("foodItems")) || [];
    setFoodItems(savedFoodItems);
  }, []);

  // Save food items to localStorage whenever the foodItems state changes
  useEffect(() => {
    localStorage.setItem("foodItems", JSON.stringify(foodItems));
  }, [foodItems]);

  const handleAddFoodItem = (foodItem) => {
    // setSelectedItems((prevSelectedItems) => [...prevSelectedItems, foodItem]);
    if (newFoodName && newFoodPrice > 0) {
      const newFoodItem = {
        id: Date.now(), // Generate a unique ID (you can use a library for better IDs)
        foodName: newFoodName,
        price: newFoodPrice,
        image: image,
      };
      console.log("newimageee", newImage);
      setFoodItems((prevFoodItems) => [...prevFoodItems, newFoodItem]);

      // Clear input fields
      setNewFoodName("");
      setNewFoodPrice("");
      setNewImage(null);
    }
  };

  const handleDeleteFoodItem = (id) => {
    setFoodItems((prevFoodItems) =>
      prevFoodItems.filter((item) => item.id !== id)
    );
  };
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   setImage(event.target.files[0]);
  // };
  // const handleImageClick = () => {
  //   inputRef.current.click();
  // };

  const handleAddToOrder = (selectedItem) => {
    setSelectedItems((prevSelectedItems) => [
      ...prevSelectedItems,
      selectedItem,
    ]);
  };

  const handleGoToAddOrderPage = () => {
    // console.log("tableIdd", tableId);
    navigate(`/add-order/1`, { state: { selectedItems } });
  };
  const handleUploadFileChange = async (e) => {
    const file = e.target.files[0];
    const image = await convertBase64(file);
    console.log("imagebase64", image);
    setImage(image);
  };
  const convertBase64 = (file) => {
    console.log("file", inputRef.current);
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
  const startEdit = (item) => {
    setEditingItemId(item.id);
    setEditedFoodName(item.foodName);
    setEditedFoodPrice(item.price);
    setEditedImage(item.image);
  };

  const cancelEdit = () => {
    setEditingItemId(null);
    setEditedFoodName("");
    setEditedFoodPrice(0);
    setEditedImage(null);
  };

  const handleEditFoodItem = (id) => {
    const editedItem = {
      id,
      foodName: editedFoodName,
      price: editedFoodPrice,
      image: editedImage,
    };

    setFoodItems((prevFoodItems) =>
      prevFoodItems.map((item) =>
        item.id === id ? { ...item, ...editedItem } : item
      )
    );

    // Clear edit state
    cancelEdit();
  };
  return (
    <>
      <div className="add-food-item">
        <h2>Manage Food Items</h2>
        <div>
          <h3>Add New Food Item</h3>
          {/* <FaUpload className="mr-1" />  */}
          <input
            type="file"
            onChange={(e) => handleUploadFileChange(e)}
            id="upload-photo"
            name="photo"
            className="form-control-file"
            // style={{ display: "none" }}
          />
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
          <button onClick={() => handleAddFoodItem()}>Add Item</button>
        </div>
        <div className="food-list">
          <h3>Food Items List</h3>
          <ul>
            {foodItems.map((item) => (
              <li className="food-item" key={item.id}>
                <div>
                  {/* Render food items */}
                  {/* {foodItems.map((item) => ( */}
                  {/* <div key={item.id}> */}
                  {/* <h3>{item.foodName}</h3> */}
                  {/* <button onClick={() => handleAddToOrder(item)}>
                      Add to Order
                    </button> */}
                </div>

                {/* <button onClick={handleGoToAddOrderPage}>
                    Go to Add Order
                  </button> */}
                {/* </div> */}
                {/* <div onClick={() => handleImageClick()}>
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
              </div> */}

                {editingItemId === item.id ? (
                  <>
                    <img
                      src={item.image}
                      alt="Uploaded"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                      }}
                      className="food-item-image"
                    />
                    <input
                      type="text"
                      placeholder="Food Name"
                      value={editedFoodName}
                      onChange={(e) => setEditedFoodName(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={editedFoodPrice}
                      onChange={(e) =>
                        setEditedFoodPrice(parseFloat(e.target.value))
                      }
                    />
                    {/* <img
                    src={
                      editedImage
                        ? URL.createObjectURL(editedImage)
                        : editedImage || item.image
                    }
                    alt="Uploaded"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                  /> */}

                    {/* <input
                    type="file"
                    ref={inputRef}
                    onChange={(e) => {
                      console.log("event", e.target.files);
                      setEditedImage(e.target.files[0]);
                    }}
                    // style={{ display: "none" }}
                  /> */}
                    <img
                      // src={
                      //   editingItemId === item.id
                      //     ? editedImage || item.image
                      //     : item.image
                      // }
                      src={item.image}
                      alt="Uploaded"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        display: "none",
                      }}
                    />

                    <input
                      type="file"
                      ref={inputRef}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        const image = await convertBase64(file);
                        setEditedImage(image);
                      }}
                    />

                    <button onClick={() => handleEditFoodItem(item.id)}>
                      Save
                    </button>
                    <button onClick={() => cancelEdit()}>Cancel</button>
                  </>
                ) : (
                  <>
                    <img
                      src={item.image}
                      alt="Uploaded"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="food-item-details">
                      <div className="food-item-name">{item.foodName}</div>
                      <div className="food-item-price">Rs {item.price}</div>
                    </div>
                    {/* {item.foodName} - Rs {item.price} */}
                    <div>
                      <button>
                        <AiIcons.AiOutlineCheckCircle />
                      </button>
                    </div>

                    <div className="">
                      {/* <div className="edit-button"> */}
                      <button
                        onClick={() => startEdit(item)}
                        className="edit-button"
                      >
                        <AiIcons.AiOutlineEdit />
                      </button>
                    </div>
                    {/* <div className="delete-buttons"> */}
                    <button
                      onClick={() => handleDeleteFoodItem(item.id)}
                      className="delete-button"
                    >
                      <AiIcons.AiOutlineDelete />
                    </button>
                    {/* </div> */}
                    {/* </div> */}
                  </>
                )}
              </li>
            ))}
          </ul>
          {/* 
        {foodItems.map((item) => (
          <FoodItemCard
            key={item.id}
            foodItem={item}
            onAddToOrder={() => handleAddFoodItem(item)} // Call handleAddFoodItem when Add button is clicked
          />
        ))}
        <button>add</button> */}
        </div>
      </div>
    </>
  );
}

export default FoodItemsPage;
