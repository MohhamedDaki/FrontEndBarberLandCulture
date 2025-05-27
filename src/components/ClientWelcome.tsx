import { useEffect, useState } from "react";
import axios from "axios";

export const ClienteWelcome = () => {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    axios.get("https://localhost:7057/api/auth/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
    })
    .then(res => {
      console.log("Datos del usuario:", res.data.name);
      setNombre(res.data.name);
    })
    .catch(err => {
      console.error("Error al obtener datos del usuario:", err);
    });
  }, []);

  

  return <h2 className="text-2xl text-red-500 font-semibold mb-4 font-rocksalt">¡Hola, {nombre}!</h2>;
};
