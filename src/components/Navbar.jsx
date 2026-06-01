import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { FiMenu, FiX } from 'react-icons/fi'

const links = [
  { to: 'about',       label: 'About'    },
  { to: 'departments', label: 'Services' },
  { to: 'portfolio',   label: 'Portfolio'},
  { to: 'contact',     label: 'Contact'  },
]

export default function Navbar({ logo }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark-800/95 backdrop-blur-sm shadow-sm border-b border-brand-600/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* LEFT: Logo box + Company Name + Subtitle stacked */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Blue box with logo/initials */}
          <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #1e3a8a)' }}>
            {logo
              ? <img src={logo} alt="CC" className="w-full h-full object-cover" />
              : <span className="font-serif font-bold text-white text-sm">CC</span>
            }
          </div>
          {/* Name + subtitle stacked */}
          <div>
            <div className="font-serif text-sm font-bold tracking-wider text-white leading-none whitespace-nowrap">
              CEPHAS CREATIONS
            </div>
            <div className="text-brand-300 text-[9px] tracking-[0.12em] uppercase font-medium whitespace-nowrap mt-0.5">
              Built · Design · Legacy
            </div>
          </div>
        </div>

        {/* RIGHT: Nav links */}
        <ul className="hidden md:flex items-center gap-6 flex-shrink-0">
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to} smooth duration={600} offset={-64}
                className="text-xs font-medium tracking-widest uppercase cursor-pointer transition-colors duration-200 text-white hover:text-brand-300 whitespace-nowrap"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="contact" smooth duration={600} offset={-64}>
              <button className="btn-gold text-xs py-2.5 px-5 whitespace-nowrap">Book a Session</button>
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white hover:text-brand-300 transition-colors" onClick={() => setOpen(!open)}>
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-dark-800 border-t border-brand-600/20">
          <ul className="flex flex-col py-4">
            {links.map(l => (
              <li key={l.to}>
                <Link to={l.to} smooth duration={600} offset={-64}
                  className="block px-6 py-3 text-xs font-medium tracking-widest uppercase text-white hover:text-brand-300 hover:bg-brand-600/10 transition-colors cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="px-6 pt-2">
              <Link to="contact" smooth duration={600} offset={-64} onClick={() => setOpen(false)}>
                <button className="btn-gold w-full text-xs py-3">Book a Session</button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
