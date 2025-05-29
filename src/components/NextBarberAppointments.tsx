import { useEffect, useState } from "react";
import axios from "axios";

import { CalendarioCitas } from "./Calendario";

interface Cita {
  id: number;
  barberId: number;
  serviceId: number;
  barberName: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

export const CitasProximas = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
    // Función para actualizar el estado de una cita
 const actualizarEstadoCita = async (citaId: number, nuevoEstado: string) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `https://localhost:7057/api/appointments/status/${citaId}`,
      { status: nuevoEstado }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Actualizar citas localmente
    setCitas((prev) =>
      prev.map((cita) =>
        cita.id === citaId ? { ...cita, status: nuevoEstado } : cita
      )
    );

    alert(`Cita ${nuevoEstado}`);
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    alert("Error al actualizar la cita.");
  }
};



  useEffect(() => {
    const fetchCitasConNombres = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://localhost:7057/api/appointments/barber/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const citasFiltradas = res.data.filter((cita: Cita) => cita.status === "pendiente" || cita.status === "confirmada" || cita.status === "cancelada");

        // Obtener barberName y serviceName para cada cita
        const citasConNombres = await Promise.all(
          citasFiltradas.map(async (cita: Cita) => {
            const [barberRes, serviceRes] = await Promise.all([
              axios.get(`https://localhost:7057/api/users/${cita.barberId}`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
              axios.get(`https://localhost:7057/api/services/${cita.serviceId}`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
            ]);

            return {
              ...cita,
              barberName: barberRes.data.name,
              serviceName: serviceRes.data.name,
            };
          })
        );

        console.log("Citas con nombres:", citasConNombres);

        setCitas(citasConNombres);
      } catch (error) {
        console.error("Error al obtener citas:", error);
      }
    };

    fetchCitasConNombres();
  }, []);

  return (
    <div>
      <h3 className="text-lg font-medium text-white mb-2 font-rocksalt">Tus próximas citas</h3>
     
        <>
          <div className="mb-6">
            <CalendarioCitas citas={citas} modo="barbero" onStatusChange={actualizarEstadoCita} />

          </div>

          

        
          
        </>
     
    </div>
  );
};

/*
  <div className="grid gap-4">
            {citas.map((cita) => (
              <CitaCard key={cita.id} cita={cita} />
            ))}
          </div>
*/
