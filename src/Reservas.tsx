import { ReservarCita } from "./components/ReservarCita";
import FondoRegistro from "./assets/bCulturehero.png";

export default function PaginaReservas() {
  return (
     <div className="bg-cover bg-center" style={{ backgroundImage: `url(${FondoRegistro})` }}>
        <div className="backdrop-blur-sm">
    <div className="container mx-auto py-10 mt-28">
      <ReservarCita />
    </div>
    </div>
     </div>
  );
}
