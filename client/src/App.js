import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { UserContextProvider } from "./UserContext";
import { RegisterAndLogin } from "./components/RegisterAndLogin";
import { Navbar } from "./components/Navbar";
import LivestreamPlayer from "./components/LivestreamPlayer";
import { Stream } from "./components/Stream";

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL + "api";
  axios.defaults.withCredentials = true;
  return (
    <div className="App box-border">
      <UserContextProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<RegisterAndLogin />} />
          <Route
            path="/stream/:streamKey"
            element={<LivestreamPlayer />}
          ></Route>
          <Route path="/stream" element={<Stream />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
