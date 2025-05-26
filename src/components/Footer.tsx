// components/Footer.tsx
import { FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import Bculture from "../assets/urban.jpg";

export default function Footer() {
  return (
    <footer
      className="py-12 text-center text-white bg-gray-900"
      style={{ backgroundImage: `url(${Bculture})`,  }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <h4 className="text-3xl font-rocksalt mb-3 text-red-500 uppercase tracking-widest">
          BarberlandCulture
        </h4>
        <p className="text-xl text-gray-300 font-JustAnotherHand mb-6">
        Calle Sor Livia Alcorta, 6, 45200 Illescas, Toledo
        </p>
        <div className="flex justify-center space-x-10 text-3xl text-red-500">
          <a href="https://www.instagram.com/kevinbarberland____/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://g.co/kgs/sqdt2k8" target="_blank" rel="noopener noreferrer" aria-label="Google Maps">
            <FaMapMarkerAlt />
          </a>
        </div>
        <p className="mt-8 text-gray-400 text-sm font-JustAnotherHand">
          &copy; 2025 BarberlandCulture
        </p>
      </div>
    </footer>
  );
}
