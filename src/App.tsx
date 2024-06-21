import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./global.css";
import SuppliesPage from "./pages/SuppliesPage/SuppliesPage";
import AddSupplyModal from "./modals/SupplyModal/AddSupplyModal";
import EditSupplyModal from "./modals/SupplyModal/EditSupplyModal";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SuppliesPage />}>
            <Route path="modal/add-supply" element={<AddSupplyModal />} />
            <Route path="modal/edit-supply/:id" element={<EditSupplyModal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
