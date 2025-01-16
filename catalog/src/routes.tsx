import { BrowserRouter, Route, Routes } from "react-router";

import { Home } from "./pages/Home";
import { NewProduct } from "./pages/NewProduct";
import { EditProduct } from "./pages/EditProduct";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}
