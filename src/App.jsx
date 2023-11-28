import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./componets/Login";
import Home from "./componets/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./componets/Register";
import Idea from "./componets/Idea";
import Mezzi from "./componets/Mezzi";

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
            path="/register_user"
            element={<Register />}
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
