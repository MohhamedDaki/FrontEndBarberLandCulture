import { useState } from "react";
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

  const fetchDisponibilidad = async () => {
    if (!barberId || !serviceId || !date) return;
     try {
    const res = await axios.get(
      `https://localhost:7057/api/disponibility/${barberId}/availability`,
      { params: { date, serviceId } }
    );
    if (!res.data || res.data.length === 0) {
      setEventos([]);
      setMensaje("No hay disponibilidad para la fecha seleccionada.");
    } else {
      setEventos(res.data);
      setMensaje(""); // Limpia el mensaje si hay disponibilidad
    }
  } catch (error) {
    setMensaje("El barbero no tiene disponibilidad para ese dia o servicio.");
    console.error(error);
  }
    
  };

  const handleSlotClick = async (slot: any) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");

    const cita = {
      clientId: user.id,
      barberId: parseInt(barberId),
      serviceId: parseInt(serviceId),
      date: slot.startStr.split("T")[0],
      startTime: slot.startStr.split("T")[1].substring(0, 5),
      endTime: slot.endStr.split("T")[1].substring(0, 5),
      status: "pendiente"
    };

    await axios.post("https://localhost:7057/api/appointments", cita, {
      headers: { Authorization: `Bearer ${token}` }
    });
    //Refresa los eventos del calendar
    await fetchDisponibilidad();

    navigate("/dashboard-cliente");
     


    alert("Cita reservada con éxito");
  };

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
