import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {},
  isLoading: false,
  error: null,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    loadAddress: (state) => {
      const myAddress = localStorage.getItem("myAddress");
      state.address = myAddress ? JSON.parse(myAddress) : {};
    },
    addAddress: (state, action) => {
      state.address = action.payload.address;
      localStorage.setItem("myAddress", JSON.stringify(state.address));
    },
  },
});

export const { loadAddress, addAddress } = addressSlice.actions;

export default addressSlice.reducer;
