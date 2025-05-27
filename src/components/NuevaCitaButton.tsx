import { useNavigate } from "react-router-dom";

export const NuevaCitaButton = () => {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate("/cliente/reservar")}className="text-white font-rocksalt text-lg mt-6 hover:text-red-500  text-center inline-flex items-center ">
Agendar Cita
<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
</button>
  );
};
 