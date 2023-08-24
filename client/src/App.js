import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { UserContextProvider } from "./UserContext";
import { RegisterAndLogin } from "./components/RegisterAndLogin";
import { Navbar } from "./components/Navbar";

function App() {
  axios.defaults.baseURL = "http://localhost:4000/api";
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <UserContextProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<RegisterAndLogin />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
