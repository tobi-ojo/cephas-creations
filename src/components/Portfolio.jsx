import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiX } from 'react-icons/fi'

const categories = [
  { id: 'all',          label: 'All Work'         },
  { id: 'architecture', label: 'Architecture'      },
  { id: 'property',     label: 'Property'          },
  { id: 'construction', label: 'Construction'      },
  { id: 'estate',       label: 'Estate & Titling'  },
]

const projects = [
  {
    id: 1,
    category: 'architecture',
    title: 'Modern Residential Villa',
    subtitle: 'Architectural Design & 3D Visualization',
    location: 'Abeokuta, Ogun State',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    tag: 'Architecture',
  },
  {
    id: 2,
    category: 'architecture',
    title: 'Commercial Office Complex',
    subtitle: '3D Render & Working Drawings',
    location: 'Sagamu, Ogun State',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    tag: 'Architecture',
  },
  {
    id: 3,
    category: 'construction',
    title: 'Luxury 5-Bedroom Duplex',
    subtitle: 'Full Construction & Project Management',
    location: 'Abeokuta GRA',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    tag: 'Construction',
  },
  {
    id: 4,
    category: 'architecture',
    title: 'Contemporary Family Home',
    subtitle: 'Concept Design & Visualization',
    location: 'Abeokuta, Ogun State',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    tag: 'Architecture',
  },
  {
    id: 5,
    category: 'property',
    title: 'Premium Estate Development',
    subtitle: 'Property Consultancy & Investment Advisory',
    location: 'Ijebu-Ode, Ogun State',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    tag: 'Property',
  },
  {
    id: 6,
    category: 'construction',
    title: 'Corporate Headquarters',
    subtitle: 'Construction & Site Supervision',
    location: 'Abeokuta, Ogun State',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    tag: 'Construction',
  },
  {
    id: 7,
    category: 'estate',
    title: 'Land Acquisition & C of O',
    subtitle: 'Full Land Titling & Documentation',
    location: 'Abeokuta, Ogun State',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    tag: 'Estate',
  },
  {
    id: 8,
    category: 'architecture',
    title: 'Photorealistic 3D Interior',
    subtitle: 'Interior Design & Space Planning',
    location: 'Sagamu, Ogun State',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    tag: 'Architecture',
  },
  {
    id: 9,
    category: 'property',
    title: 'Residential Estate Management',
    subtitle: 'Estate Agency & Long-term Management',
    location: 'Abeokuta GRA',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    tag: 'Property',
  },
]

function LightboxModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: 'rgba(18,13,6,0.95)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-3xl w-full rounded-sm overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={project.image.replace('w=800', 'w=1200')}
          alt={project.title}
          className="w-full object-cover max-h-[70vh]"
        />
        <div className="bg-dark-800 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-gold-400 text-xs font-medium tracking-widest uppercase mb-1">{project.tag}</p>
              <h3 className="font-serif text-xl font-bold text-cream mb-1">{project.title}</h3>
              <p className="text-cream/50 text-sm">{project.subtitle}</p>
              <p className="text-cream/30 text-xs mt-1">📍 {project.location}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-cream/20 text-cream/60 hover:text-cream hover:border-cream/40 transition-colors"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [active, setActive]       = useState('all')
  const [lightbox, setLightbox]   = useState(null)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = active === 'all'
    ? projects
    : projects.filter(p => p.category === active)

  return (
    <section id="portfolio" ref={ref} className="py-24 md:py-32 bg-dark-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-gold-400 text-xs font-medium tracking-[0.14em] uppercase mb-3">Our Portfolio</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream leading-tight">
              Work That<br />Speaks for Itself
            </h2>
            <p className="text-cream/45 text-sm leading-relaxed max-w-xs">
              A selection of our completed projects across all four departments.
              Click any project to view in detail.
            </p>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 text-xs font-medium tracking-widest uppercase rounded-sm transition-all duration-200 ${
                active === cat.id
                  ? 'bg-gold-600 text-cream'
                  : 'border border-cream/15 text-cream/50 hover:border-gold-600/50 hover:text-gold-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group relative rounded-sm overflow-hidden cursor-pointer bg-dark-800"
                style={{ aspectRatio: '4/3' }}
                onClick={() => setLightbox(project)}
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 via-dark-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Tag pill — always visible */}
                <div className="absolute top-3 left-3">
                  <span className="bg-gold-600/90 text-cream text-xs font-medium px-2.5 py-1 rounded-sm tracking-wide">
                    {project.tag}
                  </span>
                </div>

                {/* Expand icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/20 flex items-center justify-center">
                    <FiExternalLink size={13} className="text-cream" />
                  </div>
                </div>

                {/* Info — slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <h3 className="font-serif text-base font-bold text-cream leading-tight mb-0.5">
                    {project.title}
                  </h3>
                  <p className="text-cream/60 text-xs">{project.subtitle}</p>
                  <p className="text-gold-400/70 text-xs mt-1">📍 {project.location}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="text-cream/35 text-sm mb-4">
            Ready to add your project to this portfolio?
          </p>
          <a href="#contact">
            <button className="btn-gold">Start Your Project</button>
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <LightboxModal project={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
