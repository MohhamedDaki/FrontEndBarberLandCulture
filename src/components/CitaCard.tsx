interface Cita {
  id: number;
  serviceName: string;
  barberName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

export const CitaCard = ({ cita }: { cita: Cita }) => {
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white">
      <p className="font-semibold">{cita.serviceName}</p>
      <p>Con: {cita.barberName}</p>
      <p>{cita.date} de {cita.startTime} a {cita.endTime}</p>
      <p className="text-sm text-gray-500">Estado: {cita.status}</p>
    </div>
  );
};
