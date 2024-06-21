import React from "react";
import { Route, Routes } from "react-router-dom";
import SuppliesPage from "./pages/SuppliesPage/SuppliesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AddSupplyModal from "./modals/SupplyModal/AddSupplyModal";
import EditSupplyModal from "./modals/SupplyModal/EditSupplyModal";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SuppliesPage />}>
        <Route path="modal/add-supply" element={<AddSupplyModal />} />
        <Route path="modal/edit-supply/:id" element={<EditSupplyModal />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
