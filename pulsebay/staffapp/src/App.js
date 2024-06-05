import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import StaffManagement from "./Components/Staffpage/StaffManagement";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/staff" element={<StaffManagement />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
