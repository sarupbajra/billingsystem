import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "../store/store";

const initialState = {
  tableDetailInfo: [
    {
      tableNo: 1,
      status: "vacant",
    },
    {
      tableNo: 2,
      status: "vacant",
    },
    {
      tableNo: 3,
      status: "vacant",
    },
    {
      tableNo: 4,
      status: "vacant",
    },
    {
      tableNo: 5,
      status: "vacant",
    },
  ],
};
export const tableDetailSlice = createSlice({
  name: "tableInfo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateTableDetail: (state, action) => {
      state.tableDetailInfo = action.payload;
    },
  },
});

export const { updateTableDetail } = tableDetailSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTableDetail = (state) => state.tableDetail.tableDetailInfo;

export default tableDetailSlice.reducer;
