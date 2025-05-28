import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Booking from "./components/Booking";

import BorrarLocal  from "./components/BorrarLocal";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Booking />
    
    </>
  );
}
