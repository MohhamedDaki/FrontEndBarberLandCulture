import cut1 from "../assets/cut1.jpg";
import fade from "../assets/cut2.jpg";
import design from "../assets/cut3.jfif";

const services = [
  { name: "Corte Clásico", price: "15€", image: cut1 },
  { name: "Fade + Barba", price: "22€", image: fade },
  { name: "Diseño Personalizado", price: "25€", image: design },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-4xl font-rocksalt text-center mb-10 text-red-500 uppercase tracking-wider">Nuestros Servicios</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform">
              <img src={service.image} alt={service.name} className="w-full h-60 object-cover" />
              <div className="p-6">
                <h4 className="text-2xl font-JustAnotherHand mb-2">{service.name}</h4>
                <p className="text-xl text-red-400 font-semibold">{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
