import React, { useState } from "react";
// import { addFoodItem } from "../redux/foodMenu.slice"; // Adjust the path

function FoodItemsPage() {
  // const dispatch = useDispatch();
  const [foodItems, setFoodItems] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodPrice, setNewFoodPrice] = useState(0);

  const handleAddFoodItem = () => {
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

  const handleDeleteFoodItem = (id) => {
    setFoodItems((prevFoodItems) =>
      prevFoodItems.filter((item) => item.id !== id)
    );
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
        <button onClick={handleAddFoodItem}>Add Item</button>
      </div>
      <div className="food-list">
        <h3>Food Items List</h3>
        <ul>
          {foodItems.map((item) => (
            <li key={item.id}>
              {item.foodName} - Rs {item.price}
              <>
                <button onClick={() => handleDeleteFoodItem(item.id)}>
                  Delete
                </button>
              </>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FoodItemsPage;
