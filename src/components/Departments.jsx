import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiGrid, FiHome, FiTool, FiFileText } from 'react-icons/fi'

const departments = [
  {
    id: 1, num: '01', icon: FiGrid,
    title: 'Design & Visualization',
    tagline: 'From Vision to Reality',
    description: 'We create buildings that inspire — from initial concept sketches to photorealistic 3D renders and full working drawings. Our design team handles residential homes, commercial complexes, institutional buildings, and more.',
    services: ['Concept Design & Schematic Planning','Photorealistic 3D Visualization','Working & Construction Drawings','Interior Design & Space Planning','Building Approvals & Regulatory Compliance'],
    color: 'from-brand-600/10 to-brand-400/5', border: 'border-brand-600/20', accent: 'text-brand-600',
  },
  {
    id: 2, num: '02', icon: FiHome,
    title: 'Property Consultant',
    tagline: 'Smart Property Decisions',
    description: 'Our property consultancy team provides expert advisory services for individuals and organizations seeking to invest, develop, or optimize their real estate portfolio across Abeokuta and Ogun State.',
    services: ['Real Estate Investment Advisory','Property Valuation & Assessment','Development Feasibility Studies','Market Research & Analysis','Portfolio Strategy & Management'],
    color: 'from-blue-600/10 to-blue-400/5', border: 'border-blue-600/20', accent: 'text-blue-700',
  },
  {
    id: 3, num: '03', icon: FiTool,
    title: 'Construction',
    tagline: 'Built to Last',
    description: 'Cephas Creations manages the full construction lifecycle — from site preparation and foundation to the finishing touches. We deliver projects on time, within budget, and to the highest quality standards.',
    services: ['Residential & Commercial Construction','Site Supervision & Project Management','Structural Engineering Coordination','Renovation & Remodelling','Quality Control & Inspections'],
    color: 'from-slate-600/10 to-slate-400/5', border: 'border-slate-400/20', accent: 'text-slate-700',
  },
  {
    id: 4, num: '04', icon: FiFileText,
    title: 'Estate Agency & Land Titling',
    tagline: 'Own It. Secure It.',
    description: "From buying and selling properties to obtaining C of O, Governor's Consent, and other land documentation, our estate team ensures your property rights are fully protected and legally documented.",
    services: ['Property Sales, Leasing & Acquisition',"Certificate of Occupancy (C of O) Processing","Governor's Consent & Land Excision","Deed of Assignment & Legal Documentation","Estate Management & Maintenance"],
    color: 'from-indigo-600/10 to-indigo-400/5', border: 'border-indigo-600/20', accent: 'text-indigo-700',
  },
]

export default function Departments() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const dept = departments[active]
  const Icon = dept.icon

  return (
    <section id="departments" ref={ref} className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-14">
          <p className="section-label">Our Departments</p>
          <h2 className="section-title text-dark-800 max-w-lg">Four Pillars of<br />Excellence</h2>
          <p className="text-dark-700/60 text-base leading-relaxed max-w-xl">Each department operates with dedicated expertise. Choose a pillar to learn more.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-0 border border-gray-200 rounded-sm overflow-hidden">
          <div className="border-r border-gray-200">
            {departments.map((d, i) => {
              const TabIcon = d.icon
              return (
                <button key={d.id} onClick={() => setActive(i)}
                  className={`w-full text-left p-6 border-b border-gray-200 last:border-0 transition-all duration-200 group ${active === i ? 'bg-dark-800' : 'bg-white hover:bg-gray-50'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`mt-0.5 p-2.5 rounded-sm transition-colors ${active === i ? 'bg-brand-600/20 text-brand-400' : 'bg-gray-100 text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600'}`}>
                      <TabIcon size={18} />
                    </div>
                    <div>
                      <div className={`text-xs font-medium tracking-widest uppercase mb-1 ${active === i ? 'text-brand-400' : 'text-gray-400'}`}>{d.num}</div>
                      <div className={`font-serif text-lg font-bold leading-tight ${active === i ? 'text-white' : 'text-dark-800'}`}>{d.title}</div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <motion.div key={active} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            className={`bg-gradient-to-br ${dept.color} p-8 md:p-10 flex flex-col justify-between min-h-[480px]`}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 bg-white/70 rounded-sm border ${dept.border}`}><Icon size={22} className={dept.accent} /></div>
                <span className={`text-xs font-medium tracking-widest uppercase ${dept.accent}`}>{dept.tagline}</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-dark-800 mb-4 leading-tight">{dept.title}</h3>
              <p className="text-dark-700/65 text-sm leading-relaxed mb-8">{dept.description}</p>
              <div className="space-y-2.5">
                {dept.services.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-1 h-1 rounded-full flex-shrink-0 bg-brand-500`} />
                    <span className="text-sm text-dark-700/75">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200/60">
              <Link to="contact" smooth duration={700} offset={-64}>
                <button className="btn-gold text-xs">Enquire About This Service</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
