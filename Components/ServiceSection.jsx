"use client";

import Image from "next/image";
import { assets } from "@/Assets/assets";

const bg = {
    src: "/service.jpg",
    alt: "service",
     className:"h-auto w-auto"
};

const services = [
  {
    icon: assets.service1,
    title: "Gebrauchtwagenverkauf",
    desc: "Entdecken Sie unsere große Auswahl an geprüften Gebrauchtwagen – Qualität und faire Preise garantiert.",
    link: "#",
     
  },
  {
    icon: assets.service2,
    title: "An- und Verkauf von Fahrzeugen",
    desc: "Wir kaufen Ihr Fahrzeug zu besten Konditionen oder helfen Ihnen beim Finden Ihres Traumwagens.",
    link: "#",
    
  },
  {
    icon: assets.service3,
    title: "Abschlepp- und Transportservice deutschlandweit",
    desc: "Unser zuverlässiger Abschleppdienst bringt Ihr Fahrzeug sicher an jeden Ort in Deutschland.",
    link: "#",
    
  },
];

export default function ServiceSection() {
  return (
    <section
    id="services"
      className="relative py-20 px-4 bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${bg.src})`}}
      aria-labelledby="service-label"
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <p
          id="service-label"
          className="text-red-500 uppercase tracking-widest text-sm mb-2"
        >
          Unsere Services
        </p>
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-10">
          Wir bieten großartige Services für Ihr Fahrzeug
        </h2>

        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <li key={idx} className="bg-white rounded-xl shadow-md p-6 text-left">
              <figure className="mb-4 flex justify-center">
                <Image
                    src={service.icon}
                    alt={service.title}
                    width={110}
                    height={110}
                    loading="lazy"
                />
              </figure>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.desc}</p>
              <a
                href={`#${service.link}`}
                className="text-red-600 font-medium hover:underline inline-flex items-center"
              >
                👉 Mehr erfahren
              </a>
            </li>
          ))}
        </ul>

        <div id='autos' className="mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded transition"
          >
            Alle Services anzeigen
            <span className="material-symbols-rounded">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
