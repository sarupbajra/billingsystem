import React from "react";

function FoodItemCard({ foodItem, onAddToOrder }) {
  return (
    <div className="cardd">
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

      <button className="item-add" onClick={() => onAddToOrder(foodItem)}>
        Add
      </button>
    </div>
  );
}

export default FoodItemCard;
