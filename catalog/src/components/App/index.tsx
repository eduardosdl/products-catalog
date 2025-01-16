import { ToastContainer } from "react-toastify";
import { Router } from "../../routes";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <div id="container">
      <ToastContainer />
      <Router />
    </div>
  );
}
