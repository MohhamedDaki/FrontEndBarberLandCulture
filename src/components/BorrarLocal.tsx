

export default function BorrarLocal() {
  const handleClear = () => {
    localStorage.clear();
    alert("LocalStorage limpiado");
  };

  return (
    <button
      onClick={handleClear}
      className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
      type="button"
    >
      Limpiar localStorage
    </button>
  );
}
