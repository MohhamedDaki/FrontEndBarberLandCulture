import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


interface FormData {
  email: string;
  password: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [token, settoken] = useState<String | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //Hook para la navegación
  const navigate = useNavigate();


  // Maneja cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => {
  // Validación básica de email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password: string) => {
  // Por ejemplo, mínimo 6 caracteres
  return password.length >= 8;
};

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (!formData.email || !formData.password) {
    setError("Todos los campos son obligatorios.");
    return;
  }

  if (!validateEmail(formData.email)) {
    setError("Correo electrónico inválido.");
    return;
  }

  if (!validatePassword(formData.password)) {
    setError("La contraseña debe tener al menos 8 caracteres.");
    return;
  }

  try {
    const payload = {
      email: formData.email,
      password: formData.password,
    };

    const res = await fetch("https://localhost:7057/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Error al iniciar sesión");

    const response = await res.json();
    localStorage.setItem("authToken", response.token);
    setSuccess("Inicio de sesión exitoso");

    // Obtener los datos del usuario
    const meRes = await fetch("https://localhost:7057/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${response.token}`,
      },
    });

    if (!meRes.ok) throw new Error("No se pudieron obtener los datos del usuario");
    
    const user = await meRes.json();
   localStorage.setItem("user", JSON.stringify(user));
   


    // Redirigir según el rol
    if (user.role === "cliente") navigate("/dashboard-cliente");
    else if (user.role === "barbero") navigate("/dashboard-barbero");
    else if (user.role === "admin") navigate("/dashboard-admin");
    else throw new Error("Rol no reconocido");
  } catch (err) {
    const error = err as Error;
    setError(error.message);
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black p-8 rounded shadow max-w-md w-full font-JustAnotherHand text-2xl text-white space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-red-500 font-rocksalt">LogIn</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        className="w-full border bg-amber-50 border-gray-300 p-2 rounded text-black"
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        className="w-full border border-gray-300 bg-amber-50 p-2 rounded text-black"
      />

      <Link to="/register" className="text-blue-500 hover:underline text-center block mb-4">
        ¿No tienes cuenta? Regístrate aquí
      </Link>
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600"
      >
        Entrar
      </button>
    </form>
  );
}
