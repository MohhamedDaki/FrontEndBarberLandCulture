import {  useNavigate } from "react-router-dom";

export default function BorrarLocal() {
  //Hook para la navegación
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    alert("Sesión Cerrada");
    navigate("/", { replace: true });
    window.location.reload(); // Recargar la página para reflejar el cambio
  };

  return (
    <button type="button" onClick={cerrarSesion} className="text-white font-rocksalt text-lg  hover:text-red-500  text-center inline-flex items-center ">
Cerrar Sesión
<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
</button>
  );
}
