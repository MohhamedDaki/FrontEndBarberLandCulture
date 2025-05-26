export default function Booking() {
  return (
    <section id="booking" className="bg-black text-white text-center py-20">
       <h3 className="text-4xl font-rocksalt text-center mb-10 text-red-500 uppercase tracking-wider">¿Donde Estamos?</h3>

      {/* MAPA DE GOOGLE */}
      <div className="mt-12 max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg border-4 border-white">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12203.291908214891!2d-3.865096034754487!3d40.12394834357912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd41f1516f65ef0f%3A0xb9f0665de38532f3!2sBarberland%20Culture!5e0!3m2!1ses!2ses!4v1748186919312!5m2!1ses!2ses"
          width="100%"
          height="400"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[400px]"
        ></iframe>
      </div>
    </section>
  );
}
