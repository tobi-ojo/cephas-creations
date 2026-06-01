import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { num: '150+', label: 'Projects Completed' },
  { num: '12+',  label: 'Years of Excellent Service Delivery'  },
  { num: '4',    label: 'Expert Departments'  },
  { num: '100%', label: 'Client Commitment'   },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="bg-dark-800 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-brand-400 text-xs font-medium tracking-[0.14em] uppercase mb-4">About Us</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Quality<br />Without<br />Compromise
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-5">
              Cephas Creations is a full-spectrum built-environment firm with over a decade of
              delivering design excellence, strategic property advisory, precision construction,
              and seamless estate management across Abeokuta and the wider Ogun State.
            </p>
            <p className="text-white/55 text-base leading-relaxed mb-8">
              We operate four dedicated departments under one brand, meaning our clients benefit
              from integrated expertise at every stage of their property journey, from land acquisition
              and titling to design, construction, and long-term estate management.
            </p>
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-brand-500" />
              <span className="text-brand-400/70 text-xs tracking-widest uppercase italic font-serif">
                Built on Integrity. Designed for Legacy.
              </span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 + i * 0.1 }}
                className="bg-dark-700/50 border border-brand-600/20 p-6 rounded-sm">
                <div className="font-serif text-4xl font-bold text-brand-400 mb-1">{s.num}</div>
                <div className="text-white/40 text-xs tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
