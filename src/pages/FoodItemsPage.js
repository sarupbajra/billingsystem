import React, { useState, useEffect, useRef } from "react";
// import { addFoodItem } from "../redux/foodMenu.slice"; // Adjust the path
import FoodItemCard from "../component/FoodItemCard";
import { FaUpload } from "react-icons/fa";
function FoodItemsPage() {
  // const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const getLocalItems = () => {
    const foodItem = localStorage.getItem("foodItems");
    return foodItem ? JSON.parse(foodItem) : {};
  };
  const [foodItems, setFoodItems] = useState(getLocalItems());
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodPrice, setNewFoodPrice] = useState(0);
  const [newImage, setNewImage] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedFoodName, setEditedFoodName] = useState("");
  const [editedFoodPrice, setEditedFoodPrice] = useState(0);
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
        image: newImage,
      };

      setFoodItems((prevFoodItems) => [...prevFoodItems, newFoodItem]);

      // Clear input fields
      setNewFoodName("");
      setNewFoodPrice(0);
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
    <div className="add-food-item">
      <h2>Manage Food Items</h2>
      <div>
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
        <button onClick={() => handleAddFoodItem()}>Add Item</button>
      </div>
      <div className="food-list">
        <h3>Food Items List</h3>
        <ul>
          {foodItems.map((item) => (
            <li key={item.id}>
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
              <img
                src={image}
                alt="Uploaded"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
              <FaUpload className="mr-1" /> Update Image
              <input
                type="file"
                onChange={(e) => handleUploadFileChange(e)}
                id="upload-photo"
                name="photo"
                className="form-control-file"
                // style={{ display: "none" }}
              />
              {editingItemId === item.id ? (
                <>
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

                  <input
                    type="file"
                    ref={inputRef}
                    onChange={(e) => {
                      console.log("event", e.target.files);
                      setEditedImage(e.target.files[0]);
                    }}
                    // style={{ display: "none" }}
                  />

                  <button onClick={() => handleEditFoodItem(item.id)}>
                    Save
                  </button>
                  <button onClick={() => cancelEdit()}>Cancel</button>
                </>
              ) : (
                <>
                  {item.foodName} - Rs {item.price}
                  <div>
                    <button onClick={() => handleDeleteFoodItem(item.id)}>
                      Delete
                    </button>
                    <button onClick={() => startEdit(item)}>Edit</button>
                  </div>
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
  );
}

export default FoodItemsPage;
