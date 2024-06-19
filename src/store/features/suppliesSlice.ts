import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Supply } from "../interfaces";

interface SuppliesState {
  supplies: Supply[];
}

const initialState: SuppliesState = {
  supplies: [],
};

const suppliesSlice = createSlice({
  name: "supplies",
  initialState,
  reducers: {
    setSupplies(state, action: PayloadAction<Supply[]>) {
      state.supplies = action.payload;
    },
    addSupply(state, action: PayloadAction<Supply>) {
      state.supplies.push(action.payload);
    },
    updateSupply(state, action: PayloadAction<Supply>) {
      const updatedSupply = action.payload;
      const index = state.supplies.findIndex(
        (supply) => supply.id === updatedSupply.id
      );
      if (index !== -1) {
        state.supplies[index] = updatedSupply;
      }
    },
    deleteSupply(state, action: PayloadAction<string>) {
      const supplyIdToDelete = action.payload;
      state.supplies = state.supplies.filter(
        (supply) => supply.id !== supplyIdToDelete
      );
    },
  },
});

export const { setSupplies, addSupply, updateSupply, deleteSupply } =
  suppliesSlice.actions;

export const suppliesReducer = suppliesSlice.reducer;
