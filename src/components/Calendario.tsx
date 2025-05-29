// CalendarioCitas.tsx
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";

import "../index.css";

interface Cita {
  id: number;
  barberName: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

interface Props {
  citas: Cita[];
  modo?: "cliente" | "barbero"; // nuevo
  onStatusChange?: (citaId: number, nuevoEstado: string) => void; // nuevo
}

export const CalendarioCitas = ({ citas, modo = "cliente", onStatusChange }: Props) => {
  const [eventos, setEventos] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<any>(null);

  useEffect(() => {
    const formatearEventos = citas.map((cita) => ({
      id: cita.id.toString(),
      title: `${cita.serviceName} con ${cita.barberName}`,
      start: `${cita.date}T${cita.startTime}`,
      end: `${cita.date}T${cita.endTime}`,
      extendedProps: {
        barberName: cita.barberName,
        serviceName: cita.serviceName,
        status: cita.status,
      },
      backgroundColor: getColorByStatus(cita.status),
      borderColor: getColorByStatus(cita.status),
    }));

    setEventos(formatearEventos);
  }, [citas]);

  const getColorByStatus = (status: string) => {
    switch (status) {
      case "pendiente":
        return "#facc15";
      case "confirmada":
        return "#4ade80";
      case "cancelada":
        return "#f87171";
      default:
        return "#60a5fa";
    }
  };

  const handleEventClick = (info: any) => {
    setEventoSeleccionado(info.event);
    setModalOpen(true);
  };

  const handleConfirmar = () => {
    if (eventoSeleccionado && onStatusChange) {
      onStatusChange(parseInt(eventoSeleccionado.id), "confirmada");
      setModalOpen(false);
    }
  };

  const handleCancelar = () => {
    if (eventoSeleccionado && onStatusChange) {
      onStatusChange(parseInt(eventoSeleccionado.id), "cancelada");
      setModalOpen(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-200 max-h-[75vh] overflow-y-auto">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          locale="es"
          allDaySlot={false}
          events={eventos}
          height="auto"
          eventClick={handleEventClick}
          slotMinTime="08:00:00"
          slotMaxTime="22:00:00"
          expandRows={true}
          slotEventOverlap={false}
          eventMaxStack={3}
          eventDisplay="block"
        />
      </div>

      {modalOpen && eventoSeleccionado && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="rounded-2xl bg-white shadow-xl p-6 w-full max-w-md animate-in slide-in-bottom duration-300 ease-out">
            <h2 className="text-xl text-red-600 font-semibold mb-2 font-rocksalt">Detalles</h2>

            <div className="text-red-400">
              <p className="font-bebas">
                <strong className="font-JustAnotherHand text-2xl">Servicio:</strong> {eventoSeleccionado.extendedProps.serviceName}
              </p>
              <p className="font-bebas">
                <strong className="font-JustAnotherHand text-2xl">Barbero:</strong> {eventoSeleccionado.extendedProps.barberName}
              </p>
              <p className="font-bebas">
                <strong className="font-JustAnotherHand text-2xl">Estado:</strong> {eventoSeleccionado.extendedProps.status}
              </p>
              <p className="font-bebas">
                <strong className="font-JustAnotherHand text-2xl">Inicio:</strong> {eventoSeleccionado.start.toLocaleString()}
              </p>
              <p className="font-bebas">
                <strong className="font-JustAnotherHand text-2xl">Fin:</strong> {eventoSeleccionado.end.toLocaleString()}
              </p>
            </div>

            {modo === "barbero" && (
              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleConfirmar}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all duration-300"
                >
                  Confirmar
                </button>
                <button
                  onClick={handleCancelar}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all duration-300"
                >
                  Cancelar
                </button>
              </div>
            )}

            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
