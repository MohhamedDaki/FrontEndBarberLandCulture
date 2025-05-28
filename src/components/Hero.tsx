import { Link, useNavigate } from "react-router-dom";
import Bculture from "../assets/bCulturehero.png";
import BorrarLocal from "../components/BorrarLocal";

export default function Hero() {



  const navigate = useNavigate();

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
    <section
      className="h-screen bg-cover bg-center relative" id="hero"
      style={{ backgroundImage: `url(${Bculture})` }}
    >
    
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h2 className="text-4xl text-red-500 md:text-6xl font-bold uppercase font-rocksalt">
            BarberlandCulture <span className="text-white ">Barbería</span>
          </h2>
          

          <p className="mt-6  text-3xl font-JustAnotherHand">
            Estilo callejero. Precisión de elite.
          </p>

               <button type="button" onClick={handleReservaClick} className="text-white font-rocksalt text-lg mt-6 hover:text-red-500  text-center inline-flex items-center ">
Reserva
<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
</button>


      
    
    

        
        </div>
      </div>
    </section>
  );
}
