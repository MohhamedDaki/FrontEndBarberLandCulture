// components/RegisterInput.tsx
type RegisterInputProps = {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function RegisterInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}: RegisterInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-white font-rocksalt mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 rounded bg-black text-white border border-gray-500 focus:outline-none focus:border-red-500"
      />
    </div>
  );
}
