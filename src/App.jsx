import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./componets/login-register-auth/Login";
import Home from "./componets/home/Home";
import RegisterCustomer from "./componets/login-register-auth/RegisterCustomer";
import RegisterOwner from "./componets/login-register-auth/RegisterOwner";
import ProfileCustomer from "./componets/profile-page/ProfileCustomer";
import ProfileOwner from "./componets/profile-page/ProfileOwner";
import Auth from "./componets/login-register-auth/Auth";
import OutGone from "./componets/login-register-auth/OutGone";
import ProfileVehicle from "./componets/veicolo/ProfileVehicle";
import RegisterVehicle from "./componets/veicolo/RegisterVehicle";
import UploadDocument from "./componets/veicolo/UploadDocument";
import VehicleArrangement from "./componets/veicolo/VehicleArrangement";
import ChangeCalendar from "./componets/profile-page/ChangeCalendar";
import ResultPage from "./componets/results-page/ResultPage";
import ChangeImg from "./componets/veicolo/ChangeImg";
import Result from "./componets/results-page/Result";
import Register from "./componets/login-register-auth/Register";
import ComeFunziona from "./componets/stucture/ComeFunziona";

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
            path="/change_calendar"
            element={<ChangeCalendar />}
          />
          <Route
            path="/change"
            element={<ChangeImg />}
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
            path="/profile_vehicle"
            element={<ProfileVehicle />}
          />
          <Route
            path="/vehicle_arrangement"
            element={<VehicleArrangement />}
          />
          <Route
            path="/results_page/:start_date/:end_date"
            element={<ResultPage />}
          />
          <Route
            path="/results_page/:start_date/:end_date/:beds"
            element={<ResultPage />}
          />
          <Route
            path="/results_page/:start_date/:end_date/:province"
            element={<ResultPage />}
          />
          <Route
            path="/results_page/:start_date/:end_date/:beds/:province"
            element={<ResultPage />}
          />
          <Route
            path="/result/:id"
            element={<Result />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/rules"
            element={<ComeFunziona />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
