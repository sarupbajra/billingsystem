// AddMenuItemModal.js

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addMenuItem } from "../redux/TableDetail/foodMenu.slice";

function AddFoodModal({ show, onHide }) {
  // const dispatch = useDispatch();
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const handleAddItem = () => {
    if (itemName && price) {
      const newItem = { foodName: itemName, price: parseFloat(price) };
      // dispatch(addMenuItem(newItem));
      console.log("Adding item:", {
        foodName: itemName,
        price: parseFloat(price),
      });

      onHide();
    }
  };

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="itemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddFoodModal;
