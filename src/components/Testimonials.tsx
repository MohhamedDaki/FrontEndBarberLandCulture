import { useEffect } from "react";

export default function Testimonials() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-gray-900 text-white text-center">
      <h3 className="text-4xl font-rocksalt mb-10 text-red-500 uppercase tracking-widest">
        Opiniones de Clientes
      </h3>
      <div className="max-w-5xl mx-auto px-4">
        <div className="elfsight-app-be2380cf-a53f-4fdb-b082-5fe414503b27" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
}
