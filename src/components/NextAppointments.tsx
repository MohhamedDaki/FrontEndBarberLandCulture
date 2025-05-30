import { useEffect, useState } from "react";
import axios from "axios";
import { CitaCard } from "./CitaCard";
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

  useEffect(() => {
    const fetchCitasConNombres = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://bculture.e3a6h6affcghaac7.spaincentral.azurecontainer.io:7057/api/appointments/client/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const citasFiltradas = res.data.filter((cita: Cita) => cita.status === "pendiente" || cita.status === "confirmada" || cita.status === "cancelada");

        // Obtener barberName y serviceName para cada cita
        const citasConNombres = await Promise.all(
          citasFiltradas.map(async (cita: Cita) => {
            const [barberRes, serviceRes] = await Promise.all([
              axios.get(`http://bculture.e3a6h6affcghaac7.spaincentral.azurecontainer.io:7057/api/users/${cita.barberId}`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
              axios.get(`http://bculture.e3a6h6affcghaac7.spaincentral.azurecontainer.io:7057/api/services/${cita.serviceId}`, {
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
            <CalendarioCitas citas={citas} modo="cliente" />

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
