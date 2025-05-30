import { useEffect, useState } from "react";
import axios from "axios";

export const SelectBarberoServicio = ({ onChange }: any) => {
  const [barberos, setBarberos] = useState([]);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const b = await axios.get("http://bculture.e3a6h6affcghaac7.spaincentral.azurecontainer.io:7057/api/users/barbers");
      const s = await axios.get("http://bculture.e3a6h6affcghaac7.spaincentral.azurecontainer.io:7057/api/services");
      setBarberos(b.data);
      setServicios(s.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex gap-4 mb-4">
      <select  className="border bg-black border-white rounded" onChange={(e) => onChange("barberId", e.target.value)}>
        <option value="">Selecciona barbero</option>
        {barberos.map((b: any) => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </select>

      <select className="border bg-black border-white rounded" onChange={(e) => onChange("serviceId", e.target.value)}>
        <option  value="">Selecciona servicio</option>
        {servicios.map((s: any) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
    </div>
  );
};
