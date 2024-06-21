import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SuppliesState, Supply } from "../interfaces";
import { RootState } from "../store";

const initialState: SuppliesState = {
  supplies: [],
  filteredSupplies: [],
};

const suppliesSlice = createSlice({
  name: "supplies",
  initialState,
  reducers: {
    setSupplies(state, action: PayloadAction<Supply[]>) {
      state.supplies = action.payload;
      state.filteredSupplies = action.payload;
    },
    setFilteredSupplies: (state, action: PayloadAction<Supply[]>) => {
      state.filteredSupplies = action.payload;
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

export const {
  setSupplies,
  setFilteredSupplies,
  addSupply,
  updateSupply,
  deleteSupply,
} = suppliesSlice.actions;

export const selectSupplies = (state: RootState) => state.supplies.supplies;
export const selectFilteredSupplies = (state: RootState) =>
  state.supplies.filteredSupplies;

export const suppliesReducer = suppliesSlice.reducer;
