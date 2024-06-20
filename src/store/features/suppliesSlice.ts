import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Supply } from "../interfaces";

interface SuppliesState {
  supplies: Supply[];
  currentPage: number;
  itemsPerPage: number;
  filteredSupplies: Supply[];
}

const initialState: SuppliesState = {
  supplies: [],
  currentPage: 0,
  itemsPerPage: 10,
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
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
  },
});

export const {
  setSupplies,
  setFilteredSupplies,
  addSupply,
  updateSupply,
  deleteSupply,
  setCurrentPage,
  setItemsPerPage,
} = suppliesSlice.actions;

export const suppliesReducer = suppliesSlice.reducer;
