import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { FiMenu, FiX } from 'react-icons/fi'

const links = [
  { to: 'about',       label: 'About'       },
  { to: 'departments', label: 'Services'     },
  { to: 'portfolio',   label: 'Portfolio'    },
  { to: 'contact',     label: 'Contact'      },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm border-b border-gray-100' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="font-serif text-lg font-bold tracking-wider text-gold-600">
          CEPHAS CREATIONS
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                smooth
                duration={600}
                offset={-64}
                className={`text-xs font-medium tracking-widest uppercase cursor-pointer transition-colors duration-200 ${
                  scrolled ? 'text-dark-700 hover:text-gold-600' : 'text-dark-800 hover:text-gold-600'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="contact" smooth duration={600} offset={-64}>
              <button className="btn-gold text-xs py-2.5 px-5">Book a Session</button>
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-dark-800 hover:text-gold-600 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream border-t border-gray-100 shadow-lg">
          <ul className="flex flex-col py-4">
            {links.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  smooth
                  duration={600}
                  offset={-64}
                  className="block px-6 py-3 text-xs font-medium tracking-widest uppercase text-dark-700 hover:text-gold-600 hover:bg-gold-50 transition-colors cursor-pointer"
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
