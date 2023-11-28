import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./componets/Login";
import Home from "./componets/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Idea from "./componets/Idea";
import Mezzi from "./componets/Mezzi";
import RegisterCustomer from "./componets/RegisterCustomer";
import RegisterOwner from "./componets/RegisterOwner";
import ProfileCustomer from "./componets/ProfileCustomer";
import ProfileOwner from "./componets/ProfileOwner";
import Auth from "./componets/Auth";

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
            path="/register_customer"
            element={<RegisterCustomer />}
          />
          <Route
            path="/register_owner"
            element={<RegisterOwner />}
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
