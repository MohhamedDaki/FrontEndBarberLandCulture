// pages/RegisterPage.tsx
import Navbar from "./components/NavBar";

import RegisterForm from "./components/RegisterForm";
import FondoRegistro from "./assets/bCulturehero.png"; // fondo específico

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${FondoRegistro})` }}>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen pt-20 backdrop-blur-sm font-rocksalt">
        <RegisterForm />
      </div>
      
    </div>
  );
}
