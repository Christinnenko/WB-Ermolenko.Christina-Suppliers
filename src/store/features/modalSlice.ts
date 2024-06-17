import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Supply } from "../../components/types/supply";

interface ModalState {
  showModal: boolean;
  modalType: "add" | "edit";
  selectedSupply: Supply | null;
}

const initialState: ModalState = {
  showModal: false,
  modalType: "add",
  selectedSupply: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<{ modalType: "add" | "edit" }>) {
      state.showModal = true;
      state.modalType = action.payload.modalType;
    },
    closeModal(state) {
      state.showModal = false;
      state.selectedSupply = null;
      state.modalType = "add";
    },
    setSelectedSupply(state, action: PayloadAction<Supply | null>) {
      state.selectedSupply = action.payload;
      state.showModal = !!action.payload;
    },
  },
});

export const { openModal, closeModal, setSelectedSupply } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export const modalReducer = modalSlice.reducer;
