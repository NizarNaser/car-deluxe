'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
    const phoneNumber = "4915140144530"; // From the footer info
    const message = "Hallo, ich interessiere mich für eines Ihrer Autos.";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-24 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-all flex items-center justify-center group"
            aria-label="Contact on WhatsApp"
        >
            <FaWhatsapp size={32} />

            {/* Tooltip */}
            <span className="absolute right-full mr-4 px-3 py-1 bg-white text-black text-sm font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-gray-100">
                WhatsApp Kontakt
            </span>

            {/* Ping Animation */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 -z-10" />
        </motion.a>
    );
};

export default WhatsAppButton;
