import React from "react";
import MainButton from "../component/MainButton";
import "../pages/card.css";
// const buttonStyle = {
//   padding: "5px 10px",
//   fontSize: "16px",
//   fontWeight: "bold",
//   backgroundColor: "#f0f0f0",
//   border: "1px solid #ccc",
//   borderRadius: "5px",
//   cursor: "pointer",
//   marginRight: "5px",
// };
export default function Quantity({ value, onChange }) {
  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  return (
    <div className="quantity-container">
      <div className="">
        <MainButton
          className="quantity-button"
          title="+"
          onClick={handleIncrement}
        />
      </div>
      <div className="quantity-value">{value}</div>
      <div className="">
        <MainButton
          title="-"
          onClick={handleDecrement}
          className="quantity-button"
        />
      </div>
    </div>
  );
}
