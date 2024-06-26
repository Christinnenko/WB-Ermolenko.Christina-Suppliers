import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SearchState } from "../interfaces";

const initialState: SearchState = {
  type: "По номеру",
  input: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setSearchInput(state, action: PayloadAction<string>) {
      state.input = action.payload;
    },
  },
});

export const { setSearchType, setSearchInput } = searchSlice.actions;

export const selectSearchType = (state: RootState) => state.search.type;
export const selectSearchInput = (state: RootState) => state.search.input;

export const searchReducer = searchSlice.reducer;
