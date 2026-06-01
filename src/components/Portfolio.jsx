import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiX, FiExternalLink } from 'react-icons/fi'

const STORAGE_KEY = 'cephas_portfolio_images'

const defaultImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', location: 'Abeokuta, Ogun State' },
  { id: 2, url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', location: 'Sagamu, Ogun State' },
  { id: 3, url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', location: 'Abeokuta GRA' },
  { id: 4, url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', location: 'Abeokuta, Ogun State' },
  { id: 5, url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', location: 'Ijebu-Ode, Ogun State' },
  { id: 6, url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', location: 'Abeokuta, Ogun State' },
  { id: 7, url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', location: 'Abeokuta, Ogun State' },
  { id: 8, url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', location: 'Sagamu, Ogun State' },
  { id: 9, url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', location: 'Abeokuta GRA' },
]

export function getImages() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : defaultImages
  } catch { return defaultImages }
}

export function saveImages(imgs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(imgs))
}

export function usePortfolioImages() {
  const [images, setImages] = useState(() => getImages())
  const save = (imgs) => { setImages(imgs); saveImages(imgs) }
  return [images, save]
}

function LightboxModal({ image, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: 'rgba(6,13,31,0.97)' }} onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-3xl w-full rounded-sm overflow-hidden" onClick={e => e.stopPropagation()}>
        <img src={image.url.replace('w=800', 'w=1200')} alt="Project" className="w-full object-cover max-h-[75vh]" />
        <div className="bg-dark-800 px-6 py-4 flex items-center justify-between">
          <p className="text-white/60 text-sm">📍 {image.location}</p>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white transition-colors">
            <FiX size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [images] = usePortfolioImages()
  const [lightbox, setLightbox] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="portfolio" ref={ref} className="py-24 md:py-32 bg-dark-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-12">
          <p className="text-brand-400 text-xs font-medium tracking-[0.14em] uppercase mb-3">Our Portfolio</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">Work That<br />Speaks for Itself</h2>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">A selection of our completed projects. Click any image to view in full.</p>
          </div>
        </motion.div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {images.map((image, i) => (
              <motion.div key={image.id} layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group relative rounded-sm overflow-hidden cursor-pointer bg-dark-800"
                style={{ aspectRatio: '4/3' }} onClick={() => setLightbox(image)}>
                <img src={image.url} alt="Project" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <FiExternalLink size={13} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <p className="text-white/70 text-xs">📍 {image.location}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="mt-14 text-center">
          <p className="text-white/35 text-sm mb-4">Ready to add your project to this portfolio?</p>
          <a href="#contact"><button className="btn-gold">Start Your Project</button></a>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && <LightboxModal image={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </section>
  )
}
