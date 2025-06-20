import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

import HomePage from "./HomePage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import ClienteDashboard from "./ClientDashboard";
import Reservas from "./Reservas";
import BarberDashboard from "./BarberDashboard";






function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard-cliente" element={<ClienteDashboard/>} />
        <Route path="/reservas" element={<Reservas/>} />
        <Route path="/dashboard-barbero" element={<BarberDashboard/>} />
        
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
