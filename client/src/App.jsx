import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Pages (بننشئها بعد شوي)
import About from "./Pages/About.jsx";
import AddPet from "./Pages/AddPet.jsx";
import Adoption from "./Pages/Adoption.jsx";
import EditLostPet from "./Pages/EditLostPet.jsx";
import EditPet from "./Pages/EditPet.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Lost from "./Pages/Lost.jsx";
import PetDetails from "./Pages/PetDetails.jsx";
import Profile from "./Pages/Profile.jsx";
import Register from "./Pages/Register.jsx";
import ReportLostPet from "./Pages/ReportLostPet.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adoption" element={<Adoption />} />
        <Route path="/lost" element={<Lost />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/pet/:id" element={<PetDetails />} />
        <Route path="/report-lost-pet" element={<ReportLostPet />} />
        <Route path="/edit-pet/:id" element={<EditPet />} />
<Route path="/edit-lost/:id" element={<EditLostPet />} />
      </Routes>
    </Router>
  );
}

export default App;