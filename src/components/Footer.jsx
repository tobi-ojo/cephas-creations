import { Link } from 'react-scroll'
import { FaWhatsapp } from 'react-icons/fa'
import { FiMail, FiMapPin } from 'react-icons/fi'

const OWNER_WHATSAPP = '2348000000000'

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-cream/50 text-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-serif text-xl font-bold text-gold-400 mb-3">CEPHAS CREATIONS</div>
            <p className="text-cream/40 text-sm leading-relaxed max-w-xs mb-5">
              Abeokuta's premier built-environment firm. Four departments.
              One commitment: excellence in every project.
            </p>
            <div className="flex items-center gap-2 text-cream/40 text-xs mb-2">
              <FiMapPin size={13} />
              <span>Abeokuta, Ogun State, Nigeria</span>
            </div>
            <div className="flex items-center gap-2 text-cream/40 text-xs mb-2">
              <FiMail size={13} />
              <a href="mailto:info@cephascreations.com" className="hover:text-gold-400 transition-colors">
                info@cephascreations.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-cream/40 text-xs">
              <FaWhatsapp size={13} />
              <a
                href={`https://wa.me/${OWNER_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400 transition-colors"
              >
                +234 800 000 0000
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-xs font-medium tracking-widest uppercase text-cream/30 mb-4">Services</div>
            <ul className="space-y-2.5">
              {[
                'Architectural Design',
                'Property Consultancy',
                'Construction',
                'Estate Agency',
                'Land Titling',
              ].map(s => (
                <li key={s}>
                  <Link
                    to="departments"
                    smooth
                    duration={600}
                    offset={-64}
                    className="text-cream/45 hover:text-gold-400 transition-colors cursor-pointer text-sm"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs font-medium tracking-widest uppercase text-cream/30 mb-4">Quick Links</div>
            <ul className="space-y-2.5">
              {[
                { to: 'about',       label: 'About Us'    },
                { to: 'departments', label: 'Our Services' },
                { to: 'contact',     label: 'Contact'      },
                { to: 'contact',     label: 'Book a Call'  },
              ].map(l => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    smooth
                    duration={600}
                    offset={-64}
                    className="text-cream/45 hover:text-gold-400 transition-colors cursor-pointer text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6 flex flex-wrap justify-between gap-4 text-xs text-cream/25">
          <span>© {new Date().getFullYear()} Cephas Creations Ltd. All rights reserved.</span>
          <span>Architectural Design · Property · Construction · Estate Agency · Land Titling</span>
        </div>
      </div>
    </footer>
  )
}
