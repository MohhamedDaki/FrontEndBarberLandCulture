import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

export const CalendarioDisponibilidad = ({ eventos, onSlotClick, fechaSeleccionada }: any) => {
  const ahora = new Date();

  
 // Filtrar eventos cuyo inicio está en el futuro
  const eventosFuturos = eventos.filter((evento: any) => {
    const inicio = new Date(evento.start); 
    return inicio > ahora;
  });

  return (
    <FullCalendar
      headerToolbar={false}
      plugins={[timeGridPlugin]}
      initialView="timeGridDay"
      initialDate={fechaSeleccionada}
      validRange={{ start: fechaSeleccionada, end: fechaSeleccionada }}
      allDaySlot={false}
      slotDuration="00:30:00"
      events={eventosFuturos
        
      }  
      selectable={true}
      eventClick={(info) => {
        onSlotClick(info.event);
      }}
      height="auto"
      eventClassNames={() => "bg-green-500 text-white border border-green-700 rounded-md px-2 py-1"}
      eventContent={(arg) => (
        <div className="text-sm font-semibold text-center">
          {arg.event.title}
        </div>
      )}
      slotLabelFormat={{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }}
      nowIndicator={true}
    />
  );
};
