import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./componets/login-register-auth/Login";
import Home from "./componets/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Idea from "./componets/Idea";
import Mezzi from "./componets/Mezzi";
import RegisterCustomer from "./componets/login-register-auth/RegisterCustomer";
import RegisterOwner from "./componets/login-register-auth/RegisterOwner";
import ProfileCustomer from "./componets/profile-page/ProfileCustomer";
import ProfileOwner from "./componets/profile-page/ProfileOwner";
import Auth from "./componets/login-register-auth/Auth";
import OutGone from "./componets/login-register-auth/OutGone";
import ProfileVehicle from "./componets/veicolo/ProfileVehicle";
import RegisterVehicle from "./componets/veicolo/RegisterVehicle";
import UploadDocument from "./componets/veicolo/UploadDocument";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/auth"
            element={<Auth />}
          />
          <Route
            path="/upload_document"
            element={<UploadDocument />}
          />
          <Route
            path="/log_out"
            element={<OutGone />}
          />
          <Route
            path="/register_customer"
            element={<RegisterCustomer />}
          />
          <Route
            path="/register_owner"
            element={<RegisterOwner />}
          />
          <Route
            path="/register_vehicle"
            element={<RegisterVehicle />}
          />
          <Route
            path="/profile_customer"
            element={<ProfileCustomer />}
          />

          <Route
            path="/profile_owner"
            element={<ProfileOwner />}
          />
          <Route
            path="/profile_vehicle/:id"
            element={<ProfileVehicle />}
          />
          <Route
            path="/idea"
            element={<Idea />}
          />
          <Route
            path="/van"
            element={<Mezzi />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
