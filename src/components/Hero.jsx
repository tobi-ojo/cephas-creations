import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark-800">
      {/* Geometric background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute right-0 top-0 w-1/2 h-full opacity-10" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
          <polygon points="300,40 560,180 560,620 300,760 40,620 40,180" stroke="#8B6914" strokeWidth="1" fill="none"/>
          <polygon points="300,100 500,220 500,580 300,700 100,580 100,220" stroke="#8B6914" strokeWidth="0.5" fill="none"/>
          <polygon points="300,160 440,260 440,540 300,640 160,540 160,260" stroke="#8B6914" strokeWidth="0.5" fill="rgba(139,105,20,0.05)"/>
          <line x1="300" y1="40" x2="300" y2="760" stroke="#8B6914" strokeWidth="0.4"/>
          <line x1="40" y1="180" x2="560" y2="620" stroke="#8B6914" strokeWidth="0.4"/>
          <line x1="40" y1="620" x2="560" y2="180" stroke="#8B6914" strokeWidth="0.4"/>
          <circle cx="300" cy="400" r="8" fill="#8B6914" opacity="0.5"/>
          <circle cx="300" cy="400" r="20" stroke="#8B6914" strokeWidth="0.5" fill="none" opacity="0.3"/>
          <circle cx="300" cy="400" r="40" stroke="#8B6914" strokeWidth="0.3" fill="none" opacity="0.2"/>
        </svg>
        {/* Ambient gradient blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-600/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-400/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-32 w-full">
        <div className="max-w-2xl">
          <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 mb-8">
            <div className="h-px w-8 bg-gold-400" />
            <span className="text-gold-400 text-xs font-medium tracking-[0.18em] uppercase">
              Abeokuta, Ogun State · Est. 2010
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.25)}
            className="font-serif text-5xl md:text-7xl font-bold text-cream leading-[1.05] mb-6"
          >
            Building <span className="text-gold-400 italic">Legacies</span><br />
            Across Every<br />
            Frontier
          </motion.h1>

          <motion.p
            {...fadeUp(0.4)}
            className="text-cream/60 text-base md:text-lg leading-relaxed mb-10 max-w-lg"
          >
            Architecture, Property, Construction & Estate Management —
            four disciplines of excellence, unified under one trusted name in Abeokuta.
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="flex flex-wrap gap-4">
            <Link to="departments" smooth duration={700} offset={-64}>
              <button className="btn-gold">Explore Services</button>
            </Link>
            <Link to="contact" smooth duration={700} offset={-64}>
              <button className="btn-outline border-gold-400/50 text-gold-300 hover:bg-gold-400/10">
                Book a Consultation
              </button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-20 flex items-center gap-3"
          >
            <div className="flex flex-col gap-1">
              <span className="w-1 h-1 rounded-full bg-gold-400/60 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-1 rounded-full bg-gold-400/40 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-1 rounded-full bg-gold-400/20 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-cream/30 text-xs tracking-widest uppercase">Scroll to explore</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  )
}
