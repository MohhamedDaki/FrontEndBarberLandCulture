import { useState } from "react";
import { Link } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface ClienteData {
  phone: string;
  address: string;
  birthDate: string;
  preferredBarberId: number;
  notes: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);

  const [clienteData, setClienteData] = useState<ClienteData>({
    phone: "",
    address: "",
    birthDate: "",
    preferredBarberId: 0,
    notes: "",
  });

  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [resendingCode, setResendingCode] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);

  const isValidPhone = (phone: string) =>
    /^\d{9,15}$/.test(phone);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClienteData({ ...clienteData, [e.target.name]: e.target.value });
  };

  // Envía código de verificación al correo electrónico
 const sendVerificationCode = async (isResend = true) => {
  setResendingCode(true);
  setError("");
  if (isResend) setResendSuccess(false);

  try {
    const res = await fetch("http://blaand.g6e4baczaeauetav.spaincentral.azurecontainer.io:7057/api/mail/send-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData.email),
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("Código de estado:", res.status);
      console.error("Respuesta del servidor:", text);
      throw new Error("Error al enviar el código.");
    }

    setCodeSent(true);
    if (isResend) setResendSuccess(true); 
  } catch (err) {
    const error = err as Error;
    setError(error.message || "Ocurrió un error.");
  } finally {
    setResendingCode(false);
  }
};

// Verifica el código de verificación ingresado por el usuario
  const verifyCode = async () => {
    try {
      const res = await fetch("http://blaand.g6e4baczaeauetav.spaincentral.azurecontainer.io:7057/api/mail/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code: verificationCode }),
      });

      if (!res.ok) throw new Error("Código inválido.");
      setCodeVerified(true);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    }
  };

  // Maneja el envío inicial del formulario
  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isValidEmail(formData.email)) {
      setError("Correo electrónico no válido.");
      return;
    }

    if (!isValidPassword(formData.password)) {
      setError("La contraseña debe tener al menos 6 caracteres, incluyendo mayúsculas, minúsculas y un número.");
      return;
    }

    if (!formData.name || !formData.email || !formData.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    await sendVerificationCode(false);
  };

  // Crea el usuario en la base de datos
  const handleUserCreation = async () => {
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        passwordHash: formData.password,
        role: "cliente",
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("http://blaand.g6e4baczaeauetav.spaincentral.azurecontainer.io:7057/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al crear usuario");

      const user = await res.json();
      setUserId(user.id);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    }
  };

  // Envía los datos del cliente y finaliza el registro
  const handleClienteSubmit = async () => {
    if (!isValidPhone(clienteData.phone)) {
      setError("El teléfono debe tener entre 9 y 15 dígitos numéricos.");
      return;
    }

    if (!clienteData.address || clienteData.address.trim().length < 5) {
      setError("La dirección debe tener al menos 5 caracteres.");
      return;
    }

    if (!clienteData.birthDate || isNaN(Date.parse(clienteData.birthDate)) || new Date(clienteData.birthDate) > new Date()) {
      setError("Introduce una fecha de nacimiento válida.");
      return;
    }

    try {
      const res = await fetch("http://blaand.g6e4baczaeauetav.spaincentral.azurecontainer.io:7057/api/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          ...clienteData,
        }),
      });

      if (!res.ok) throw new Error("Error al registrar como cliente");

      const res2 = await fetch("http://blaand.g6e4baczaeauetav.spaincentral.azurecontainer.io:7057/api/mail/send-welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData.email),
      });

      if (!res2.ok) throw new Error("Error al enviar correo de bienvenida");

      setSuccess("Registro completo 🎉");

      setFormData({ name: "", email: "", password: "" });
      setClienteData({
        phone: "",
        address: "",
        birthDate: "",
        preferredBarberId: 0,
        notes: "",
      });
      setCodeSent(false);
      setCodeVerified(false);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Ocurrió un error.");
    }
  };

  return (
    <form
      onSubmit={!codeSent ? handleInitialSubmit : (e) => e.preventDefault()}
      className="bg-black p-8 rounded shadow max-w-md w-full text-white space-y-4 text-2xl font-JustAnotherHand"
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-red-500 font-rocksalt">Registro</h2>

      {error && <p className="text-red-500 text-md text-center">{error}</p>}
      {success && <p className="text-green-600 text-md text-center">{success}</p>}

      {!codeSent && (
        <>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 text-black bg-amber-50 p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 text-black bg-amber-50 p-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 text-black bg-amber-50 p-2 rounded"
          />
          <Link to="/login" className="text-blue-500 hover:underline text-center block mb-4">
            ¿Tienes cuenta? Logueate aquí
          </Link>
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600">
            Enviar código de verificación
          </button>
        </>
      )}

      {codeSent && !codeVerified && (
        <>
          <input
            type="text"
            placeholder="Código de verificación"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full border border-gray-300 text-black bg-amber-50 p-2 rounded"
          />
          <button
            type="button"
            onClick={async () => {
              await verifyCode();
              if (verificationCode) await handleUserCreation();
            }}
            className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
          >
            Verificar Código
          </button>

          <button
            type="button"
            onClick={sendVerificationCode}
            disabled={resendingCode}
            className={`text-blue-500 hover:underline text-2xl text-center block mb-2 ${
              resendingCode ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {resendingCode
              ? "Reenviando..."
              : "¿No has recibido el código? Haz click para enviarlo otra vez"}
          </button>

          {resendSuccess && (
            <p className="text-green-400 text-sm text-center">Código reenviado correctamente.</p>
          )}
        </>
      )}

      {codeVerified && userId && (
        <>
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={clienteData.phone}
            onChange={handleClienteChange}
            className="w-full border border-gray-300 text-black bg-amber-50 p-2 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={clienteData.address}
            onChange={handleClienteChange}
            className="w-full border border-gray-300 text-black bg-amber-50 p-2 rounded"
          />
          <input
            type="date"
            name="birthDate"
            value={clienteData.birthDate}
            onChange={handleClienteChange}
            className="w-full border border-gray-300 text-black bg-amber-50 p-2 rounded"
          />
         <select
  name="preferredBarberId"
  value={clienteData.preferredBarberId}
  onChange={(e) =>
    setClienteData({
      ...clienteData,
      preferredBarberId: parseInt(e.target.value),
    })
  }
  className="w-full border border-gray-300 text-black bg-amber-50 p-2 rounded"
>
  <option value={0}>Selecciona un barbero</option>
  <option value={1}>Kevin</option>
  <option value={2}>Miguel</option>
</select>
          <input
            type="text"
            name="notes"
            placeholder="Notas"
            value={clienteData.notes}
            onChange={handleClienteChange}
            className="w-full border border-gray-300 text-black bg-amber-50 p-2 rounded"
          />
          <button
            type="button"
            onClick={handleClienteSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
          >
            Finalizar Registro
          </button>
        </>
      )}
    </form>
  );
}
