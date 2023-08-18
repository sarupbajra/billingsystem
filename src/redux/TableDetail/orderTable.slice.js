import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const orderTablesSlice = createSlice({
  name: "orderTables",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { tableId, item } = action.payload;
      if (!state[tableId]) {
        state[tableId] = { items: [] };
      }
      const existingItem = state[tableId].items.find(
        (existingItem) => existingItem.itemName === item.itemName
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.cost += item.price * item.quantity;
      } else {
        state[tableId].items.push({
          ...item,
          cost: item.price * item.quantity,
        });
      }
    },
    removeItem: (state, action) => {
      const { tableId, index } = action.payload;
      state[tableId].items.splice(index, 1);
    },
    updateQuantity: (state, action) => {
      const { tableId, index, quantity } = action.payload;
      state[tableId].items[index].quantity = quantity;
      state[tableId].items[index].cost =
        state[tableId].items[index].price * quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = orderTablesSlice.actions;

export default orderTablesSlice.reducer;
