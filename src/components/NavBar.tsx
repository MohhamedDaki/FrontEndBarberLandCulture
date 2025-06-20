import BarberLogo from "../assets/Barberlandlogo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CerrarSesion from "./BorrarLocal"
import { useEffect, useState } from "react";
import {ClienteWelcome} from "./ClientWelcome";


export default function Navbar() {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);


  const handleReservaClick = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Usuario ya logueado, navegar a la página de reserva o dashboard
      navigate("/dashboard-cliente"); // o "/reserva" si tienes esa ruta
    } else {
      // No logueado, navegar a login
      navigate("/login");
    }
  };

  



  return (

    
    <nav className="fixed top-0 w-full bg-black bg-opacity-75  text-white shadow-lg z-50  tracking-widest">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 border-b border-white-600">
        <Link
  to="/#hero"

>
        <div className="flex items-center space-x-4">
          <img src={BarberLogo} alt="BarberLandLOGO" className="w-20 " />
          
        </div>
        </Link>

        <ul className="hidden md:flex space-x-8 text-lg font-rocksalt">
          <li>
            <Link to="/#about" className="hover:text-red-500 transition ">
              Nosotros
            </Link>
          </li>
          <li>
            <Link to="/#services" className="hover:text-red-500 transition">
              Servicios
            </Link>
          </li>
          <li>
            <Link to="/#testimonials" className="hover:text-red-500 transition">
              Opiniones
            </Link>
          </li>
        </ul>

         {/* Mostrar botón solo si l token existe */}
        {token && (
         
          <CerrarSesion/>
        )}

        <button type="button" onClick={handleReservaClick} className="text-white font-rocksalt text-lg hover:text-red-500  text-center inline-flex items-center ">
Reserva
<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
</button>



      </div>
    </nav>
    
  );
}
