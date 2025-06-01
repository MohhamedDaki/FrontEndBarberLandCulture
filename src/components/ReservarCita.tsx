import { useState,useEffect } from "react";
import axios from "axios";
import { SelectBarberoServicio } from "./SelectBarberoServicio";
import { CalendarioDisponibilidad } from "./CalendarioDisponibilidad";
import { useNavigate } from "react-router-dom";



export const ReservarCita = () => {
    const navigate = useNavigate();
  const [barberId, setBarberId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [eventos, setEventos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  


  const handleChange = (field: string, value: string) => {
    if (field === "barberId") setBarberId(value);
    if (field === "serviceId") setServiceId(value);
  };

  // Función para obtener la disponibilidad del barbero
  const fetchDisponibilidad = async () => {
    if (!barberId || !serviceId || !date) return;
     try {
    const res = await axios.get(
      `http://blaand.g6e4baczaeauetav.spaincentral.azurecontainer.io:7057/api/disponibility/${barberId}/availability`,
      { params: { date, serviceId } }
    );
    if (!res.data || res.data.length === 0) {
      setEventos([]);
      setMensaje("No hay disponibilidad para la fecha seleccionada.");
    } else {
      setEventos(res.data);
      console.log("Eventos:", res.data);
      setMensaje(""); // Limpia el mensaje si hay disponibilidad
    }
  } catch (error) {
    setMensaje("El barbero no tiene disponibilidad para ese dia o servicio.");
    console.error(error);
  }
    
  };

  
  // Maneja el clic en un slot del calendario
  // y reserva la cita
  const handleSlotClick = async (slot: any) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");

    const cita = {
      clientId: user.id,
      barberId: parseInt(barberId),
      serviceId: parseInt(serviceId),
      date: slot.startStr.split("T")[0],
      startTime: slot.startStr.split("T")[1].substring(0, 8),
      endTime: slot.endStr.split("T")[1].substring(0, 8),
      status: "pendiente"
    };

    try{

    console.log(cita);

     await axios.post("http://blaand.g6e4baczaeauetav.spaincentral.azurecontainer.io:7057/api/appointments", cita, {
      headers: { Authorization: `Bearer ${token}` }
    });

     alert("Cita reservada con éxito");

     
    //Refresa los eventos del calendar
    await fetchDisponibilidad();

    navigate("/dashboard-cliente");

} catch (error: unknown) {
  console.error("Error reservando cita:", error);

    if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 400) {
        alert("Ya tienes una cita reservada para ese día");
      } else if (error.response.status >= 500) {
        alert("Error al reservar la cita. Inténtalo de nuevo.");
      } else {
        alert("Error inesperado: " + error.response.statusText);
      }
    } else {
      alert("No se pudo conectar con el servidor.");
    }
  } else {
    alert("Error inesperado");
  }

}

   
   
  };

  // Efecto para cargar la disponibilidad al cambiar barberId, serviceId o date
  useEffect(() => {
  if (barberId && serviceId && date) {
    fetchDisponibilidad();
  }
}, [barberId, serviceId, date]);


  return (
    <div className="p-6 max-w-md mx-auto bg-black border-1 border-white rounded-2xl shadow-md space-y-6">
  <h2 className="text-2xl  text-red-600 font-rocksalt">Reservar una cita</h2>

  <div className="font-JustAnotherHand text-white border-white text-2xl">
    <SelectBarberoServicio onChange={handleChange} />
  </div>

  <div>
    <label className="block text-3xl font-medium font-JustAnotherHand text-red-600 mb-1">Selecciona una fecha:</label>
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
        min={new Date().toISOString().split("T")[0]} 
      className="w-full text-black bg-white font-JustAnotherHand text-2xl px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
    />
  </div>
{/*
  <button
    disabled={!barberId || !serviceId || !date}
    onClick={fetchDisponibilidad}
    className={`w-full  font-JustAnotherHand text-2xl text-center px-4 py-2 rounded-lg transition-all duration-300 ${
      !barberId || !serviceId || !date
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-red-600 text-white hover:bg-red-800"
    }`}
  >
    Ver disponibilidad
  </button>
  */}
  {mensaje && (
  <div className="text-red-600 text-sm font-medium">{mensaje}</div>
)}

  {eventos.length > 0 && !mensaje && (
  <div className="pt-4 border-t bg-white">
    <CalendarioDisponibilidad
      eventos={eventos}
      onSlotClick={handleSlotClick}
      fechaSeleccionada={date}
    />
  </div>
)}

</div>

  );
};
