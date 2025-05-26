// components/About.tsx

import Bculture from "../assets/urban.jpg";
export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-900 text-white"   style={{ backgroundImage: `url(${Bculture})`,  }}>
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h3 className="text-4xl font-rocksalt mb-8 text-red-500 uppercase tracking-widest">
          Nuestra Cultura
        </h3>
        <p className="text-3xl text-gray-300 font-JustAnotherHand leading-relaxed">
          En <strong className="text-red-500 font-rocksalt">BarberlandCulture</strong>, no hacemos cortes comunes. Hacemos arte con navaja. Nacimos en la calle y vivimos por el estilo. 
          Cada fade, cada línea, cada detalle… habla de quién eres. Aquí no vienes solo por un corte, vienes a marcar presencia. Esto es cultura, esto es <span className="text-red-500 font-rocksalt">Barberland</span>.
        </p>
      </div>
    </section>
  );
}
