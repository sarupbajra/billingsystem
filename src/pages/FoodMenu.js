import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addMenuItem, editMenuItem } from "../redux/TableDetail/foodMenu.slice"; // You need to define the editMenuItem action

function AddFoodModal({ show, onHide, editMode, itemToEdit }) {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState(editMode ? itemToEdit.foodName : "");
  const [price, setPrice] = useState(editMode ? itemToEdit.price : "");

  const handleAddOrEditItem = () => {
    if (itemName && price) {
      const newItem = { foodName: itemName, price: parseFloat(price) };

      if (editMode) {
        dispatch(editMenuItem({ id: itemToEdit.id, newItem }));
      } else {
        dispatch(addMenuItem(newItem));
      }

      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editMode ? "Edit Menu Item" : "Add New Menu Item"}
        </Modal.Title>
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
        <Button variant="primary" onClick={handleAddOrEditItem}>
          {editMode ? "Save Changes" : "Add Item"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddFoodModal;
