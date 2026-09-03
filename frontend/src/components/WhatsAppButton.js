import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WA_URL =
  "https://wa.me/919539080001?text=" +
  encodeURIComponent("Hi Flow Club! I'd like to reserve a table / ask about an event.");

export default function WhatsAppButton() {
  return (
    <motion.a
      data-testid="whatsapp-floating-button"
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.2, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="fixed bottom-6 right-6 z-[70] w-14 h-14 rounded-full bg-[#25D366] text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" />
      <MessageCircle size={24} className="relative" />
    </motion.a>
  );
}
