import "./App.css";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import UserPage from "./components/userPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/user/:username" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
