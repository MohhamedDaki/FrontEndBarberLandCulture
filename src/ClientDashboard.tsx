import { ClienteWelcome } from "./components/ClientWelcome";
import { CitasProximas } from "./components/NextAppointments";
import { NuevaCitaButton } from "./components/NuevaCitaButton";
//import  BorrarLocal  from "./components/BorrarLocal" <BorrarLocal /> ; 

import FondoRegistro from "./assets/bCulturehero.png";

const ClienteDashboard = () => {
  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: `url(${FondoRegistro})` }}>
        <div className="backdrop-blur-sm">
    <div className="p-6 max-w-3xl mt-27 mx-auto ">
      <ClienteWelcome />
      <CitasProximas />
      <NuevaCitaButton />
      </div>
      
    </div>
    </div>
  );
};

export default ClienteDashboard;
