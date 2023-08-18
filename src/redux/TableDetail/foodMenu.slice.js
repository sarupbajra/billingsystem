import { createSlice } from "@reduxjs/toolkit";
import { foodMenuItem } from "../../utils/TableInfo";
export const foodMenuSlice = createSlice({
  name: "foodMenu",
  initialState: {
    foodMenuItem: foodMenuItem,
    orderTables: JSON.parse(localStorage.getItem("orderTables")) || {},
  },
  reducers: {
    // Reducer to add the new item to the order table
    addItemToOrderTable: (state, action) => {
      const { tableId, itemName, price, quantity } = action.payload;
      const newItem = {
        itemName,
        price,
        quantity,
        cost: price * quantity,
      };
      const tableData = state.orderTables[tableId] || { items: [] };
      state.orderTables[tableId] = {
        ...tableData,
        items: [...tableData.items, newItem],
      };
    },
    // Reducer to remove an item from the order table
    removeItemFromOrderTable: (state, action) => {
      const { tableId, index } = action.payload;
      const updatedTable = {
        ...state.orderTables[tableId],
        items: state.orderTables[tableId].items.filter(
          (item, i) => i !== index
        ),
      };
      state.orderTables[tableId] = updatedTable;
    },
    // Reducer to handle quantity change of an item in the order table
    updateItemQuantity: (state, action) => {
      const { tableId, index, quantity } = action.payload;
      const updatedTable = {
        ...state.orderTables[tableId],
        items: state.orderTables[tableId].items.map((item, i) =>
          i === index
            ? { ...item, quantity, cost: item.price * quantity }
            : item
        ),
      };
      state.orderTables[tableId] = updatedTable;
    },
    // Load order tables from local storage
    loadOrderTables: (state) => {
      state.orderTables = JSON.parse(localStorage.getItem("orderTables")) || {};
    },
    // Save order tables to local storage
    saveOrderTables: (state) => {
      localStorage.setItem("orderTables", JSON.stringify(state.orderTables));
    },
    addMenuItem: (state, action) => {
      state.foodMenuItem.push(action.payload);
    },

    // Edit a menu item
    editMenuItem: (state, action) => {
      const { index, updatedItem } = action.payload;
      state.foodMenuItem[index] = updatedItem;
    },

    // Delete a menu item
    deleteMenuItem: (state, action) => {
      const index = action.payload;
      state.foodMenuItem.splice(index, 1);
    },
  },
});

export const {
  addItemToOrderTable,
  removeItemFromOrderTable,
  updateItemQuantity,
  loadOrderTables,
  saveOrderTables,
  addMenuItem,
  editMenuItem,
  deleteMenuItem,
} = foodMenuSlice.actions;
export default foodMenuSlice.reducer;
