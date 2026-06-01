import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

const OWNER_WHATSAPP = '2348000000000'

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-2xl border border-gray-100 w-72 overflow-hidden">
            <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center font-serif font-bold text-brand-700 text-sm flex-shrink-0">CC</div>
              <div>
                <div className="text-white font-medium text-sm">Cephas Creations</div>
                <div className="text-white/60 text-xs">Typically replies within 1 hour</div>
              </div>
            </div>
            <div className="px-4 py-4 bg-[#ece5dd]">
              <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[90%]">
                <p className="text-dark-800 text-sm leading-relaxed">Hello! 👋 How can we help you today? Ask about our design, property, construction or estate services.</p>
                <p className="text-gray-400 text-xs mt-1 text-right">Now</p>
              </div>
            </div>
            <div className="px-4 pb-4 bg-[#ece5dd] space-y-2">
              {['I need design & visualization','I want to buy/sell property','I have a construction project','I need land titling help'].map(msg => (
                <a key={msg} href={`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center text-[#075E54] border border-[#075E54]/40 bg-white/80 hover:bg-white text-xs py-2 px-3 rounded-full transition-colors">
                  {msg}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:bg-[#1ebe5d] transition-colors"
        aria-label="Open WhatsApp chat">
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><FiX size={22} /></motion.span>
            : <motion.span key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><FaWhatsapp size={26} /></motion.span>
          }
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
