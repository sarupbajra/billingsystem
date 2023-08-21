import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodMenuItems: [], // This will store your food items
};

const foodMenuSlice = createSlice({
  name: "foodMenu",
  initialState,
  reducers: {
    addFoodItem: (state, action) => {
      state.foodMenuItems.push(action.payload);
    },
    deleteFoodItem: (state, action) => {
      state.foodMenuItems = state.foodMenuItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addFoodItem, deleteFoodItem } = foodMenuSlice.actions;

export default foodMenuSlice.reducer;
