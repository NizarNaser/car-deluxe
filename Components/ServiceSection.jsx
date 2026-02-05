"use client";

import Image from "next/image";
import { assets } from "@/Assets/assets";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: assets.service1,
    title: "Gebrauchtwagenverkauf",
    desc: "Entdecken Sie unsere große Auswahl an geprüften Gebrauchtwagen – Qualität und faire Preise garantiert.",
    features: ["Geprüfte Qualität", "Faire Preise", "Garantie"]
  },
  {
    icon: assets.service2,
    title: "An- und Verkauf",
    desc: "Wir kaufen Ihr Fahrzeug zu besten Konditionen oder helfen Ihnen beim Finden Ihres Traumwagens.",
    features: ["Direktankauf", "Inzahlungnahme", "Bestpreise"]
  },
  {
    icon: assets.service3,
    title: "Transportservice",
    desc: "Unser zuverlässiger Abschleppdienst bringt Ihr Fahrzeug sicher an jeden Ort in Deutschland.",
    features: ["Deutschlandweit", "24/7 Service", "Sicherer Transport"]
  },
];

export default function ServiceSection() {
  return (
    <section id="services" className="relative py-24 overflow-hidden bg-black">
      {/* Background Image with Optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/service.jpg"
          alt="Service background"
          fill
          className="object-cover opacity-40 grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary uppercase tracking-[0.3em] text-sm font-bold mb-4"
          >
            Unsere Leistungen
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
          >
            Premium Services für <br />
            <span className="text-glow">Ihr Fahrzeug</span>
          </motion.h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-5 md:p-8 rounded-3xl glass hover:bg-white/10 transition-all duration-500 border border-white/10"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 p-4 bg-primary rounded-2xl shadow-xl shadow-red-600/30 group-hover:scale-110 transition-transform duration-500">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={48}
                  height={48}
                  className="brightness-0 invert"
                />
              </div>

              <div className="mt-8 space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.desc}
                </p>

                <ul className="space-y-2 pt-4 w-full">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 size={16} className="text-primary" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold pt-4 group/btn w-full md:w-auto">
                  <span>Mehr erfahren</span>
                  <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          id='autos'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <button className="px-10 py-5 bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 font-black rounded-2xl flex items-center gap-3 mx-auto uppercase tracking-tighter">
            Alle Leistungen entdecken
            <ArrowRight size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
