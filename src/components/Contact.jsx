import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FiCheck, FiLoader, FiAlertCircle } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

// ─────────────────────────────────────────────
// CONFIGURATION — fill these in before deploying
// ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_iboboc8'   // from emailjs.com dashboard
const EMAILJS_TEMPLATE_ID = 'template_830n4m3'  // from emailjs.com dashboard
const EMAILJS_PUBLIC_KEY  = 'YZPa35qCAVoEp55gM'  // from emailjs.com account > API keys

const OWNER_WHATSAPP = '2348000000000'           // owner's WhatsApp number with country code, no +

const CALENDLY_URL = 'https://calendly.com/YOUR_CALENDLY_USERNAME' // owner's Calendly link
// ─────────────────────────────────────────────

const departments = [
  'Architectural Design & Visualization',
  'Property Consultancy',
  'Construction',
  'Estate Agency & Land Titling',
  'General Enquiry',
]

const budgetRanges = [
  'Under ₦2,000,000',
  '₦2,000,000 – ₦10,000,000',
  '₦10,000,000 – ₦50,000,000',
  '₦50,000,000 – ₦200,000,000',
  'Above ₦200,000,000',
  'Not sure yet',
]

const initialForm = {
  name:        '',
  email:       '',
  phone:       '',
  department:  '',
  budget:      '',
  location:    '',
  timeline:    '',
  description: '',
  hearAboutUs: '',
}

function CalendlyEmbed({ url }) {
  return (
    <div className="mt-8">
      <iframe
        src={`${url}?embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1`}
        width="100%"
        style={{ minHeight: 660, border: 'none' }}
        title="Book a session with Cephas Creations"
        loading="lazy"
      />
    </div>
  )
}

export default function Contact() {
  const [form, setForm]       = useState(initialForm)
  const [status, setStatus]   = useState('idle') // idle | sending | success | error
  const [showCalendly, setShowCalendly] = useState(false)
  const formRef = useRef(null)
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const buildWhatsAppMsg = () => {
    const lines = [
      `*New Enquiry — Cephas Creations Website*`,
      ``,
      `*Name:* ${form.name}`,
      `*Email:* ${form.email}`,
      `*Phone:* ${form.phone}`,
      `*Department:* ${form.department}`,
      `*Budget Range:* ${form.budget}`,
      `*Project Location:* ${form.location}`,
      `*Desired Timeline:* ${form.timeline}`,
      ``,
      `*Project Description:*`,
      form.description,
      ``,
      `*How they heard about us:* ${form.hearAboutUs}`,
    ]
    return encodeURIComponent(lines.join('\n'))
  }

  const sendViaWhatsApp = () => {
    const msg = buildWhatsAppMsg()
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${msg}`, '_blank')
  }

  const sendEmail = async e => {
    e.preventDefault()
    setStatus('sending')

    const templateParams = {
      from_name:    form.name,
      from_email:   form.email,
      from_phone:   form.phone,
      department:   form.department,
      budget:       form.budget,
      location:     form.location,
      timeline:     form.timeline,
      description:  form.description,
      hear_about:   form.hearAboutUs,
      reply_to:     form.email,
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const isValid =
    form.name && form.email && form.phone && form.department && form.description

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="section-label">Get in Touch</p>
          <h2 className="section-title text-dark-800">
            Let's Build<br />Something Together
          </h2>
          <p className="text-dark-700/60 text-base leading-relaxed max-w-xl">
            Fill in the form below so we can fully understand your project.
            You can also book a session directly on our calendar — we'll
            only show you dates we're genuinely available.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* ─── FORM ─── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              {/* Row 1 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handle}
                    placeholder="e.g. Adebayo Johnson"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handle}
                    placeholder="you@example.com"
                    className="input-field"
                    required
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Phone / WhatsApp *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handle}
                    placeholder="+234 800 000 0000"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Department / Service *</label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handle}
                    className="input-field"
                    required
                  >
                    <option value="">Select a service...</option>
                    {departments.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Project Location</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handle}
                    placeholder="e.g. Abeokuta, Sagamu..."
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="form-label">Budget Range</label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handle}
                    className="input-field"
                  >
                    <option value="">Select a range...</option>
                    {budgetRanges.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4 */}
              <div>
                <label className="form-label">Desired Timeline</label>
                <input
                  name="timeline"
                  value={form.timeline}
                  onChange={handle}
                  placeholder="e.g. Ready to start now / Within 3 months / Just exploring"
                  className="input-field"
                />
              </div>

              {/* Description */}
              <div>
                <label className="form-label">Tell Us About Your Project *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handle}
                  rows={5}
                  placeholder="Describe what you need in as much detail as possible. The more you share, the better we can prepare for your consultation."
                  className="input-field resize-none"
                  required
                />
              </div>

              {/* How did you hear */}
              <div>
                <label className="form-label">How Did You Hear About Us?</label>
                <input
                  name="hearAboutUs"
                  value={form.hearAboutUs}
                  onChange={handle}
                  placeholder="Google, referral, social media, word of mouth..."
                  className="input-field"
                />
              </div>

              {/* Submit buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                {/* Email submit */}
                <button
                  type="submit"
                  disabled={!isValid || status === 'sending'}
                  className={`btn-gold flex items-center gap-2 ${
                    (!isValid || status === 'sending') ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {status === 'sending' ? (
                    <><FiLoader size={14} className="animate-spin" /> Sending...</>
                  ) : (
                    'Send Enquiry via Email'
                  )}
                </button>

                {/* WhatsApp submit */}
                <button
                  type="button"
                  onClick={sendViaWhatsApp}
                  disabled={!isValid}
                  className={`flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 text-xs font-medium tracking-widest uppercase rounded-sm transition-all hover:bg-[#1ebe5d] active:scale-95 ${
                    !isValid ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FaWhatsapp size={16} />
                  Send via WhatsApp
                </button>
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-sm text-sm"
                >
                  <FiCheck size={16} className="flex-shrink-0" />
                  <span>
                    <strong>Enquiry sent!</strong> We'll be in touch within 24 hours.
                    You can also book a session directly on our calendar below.
                  </span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm"
                >
                  <FiAlertCircle size={16} className="flex-shrink-0" />
                  <span>
                    Something went wrong. Please try the <strong>WhatsApp</strong> button or email us directly.
                  </span>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* ─── SIDE INFO + CALENDLY TRIGGER ─── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info card */}
            <div className="bg-dark-800 rounded-sm p-6 text-cream">
              <h3 className="font-serif text-xl font-bold mb-4">What Happens Next?</h3>
              <div className="space-y-4">
                {[
                  { step: '01', text: 'We receive your enquiry and review your project details within 24 hours.' },
                  { step: '02', text: 'A senior consultant reaches out to confirm and ask any clarifying questions.' },
                  { step: '03', text: 'We schedule your consultation — in person or virtual — at a time that works for you.' },
                  { step: '04', text: 'You receive a personalised proposal scoped to your exact needs and budget.' },
                ].map(item => (
                  <div key={item.step} className="flex gap-4">
                    <span className="font-serif text-gold-400 font-bold text-sm flex-shrink-0 mt-0.5">{item.step}</span>
                    <p className="text-cream/60 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp direct */}
            <a
              href={`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent('Hello Cephas Creations, I would like to enquire about your services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white px-5 py-4 rounded-sm hover:bg-[#1ebe5d] transition-colors w-full"
            >
              <FaWhatsapp size={24} />
              <div>
                <div className="font-medium text-sm">Chat directly on WhatsApp</div>
                <div className="text-white/70 text-xs">Typically responds within 1 hour</div>
              </div>
            </a>

            {/* Calendly booking */}
            <div className="border border-gray-200 rounded-sm overflow-hidden">
              <button
                onClick={() => setShowCalendly(!showCalendly)}
                className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
              >
                <div>
                  <div className="font-medium text-sm text-dark-800">📅 Book a Consultation Session</div>
                  <div className="text-dark-700/50 text-xs mt-0.5">See real available dates on our calendar</div>
                </div>
                <span className="text-gold-600 text-lg">{showCalendly ? '−' : '+'}</span>
              </button>

              {showCalendly && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden border-t border-gray-100"
                >
                  <div className="p-4 bg-gray-50 text-xs text-dark-700/60 leading-relaxed">
                    Select a date and time below. You'll receive a confirmation email with all the details.
                  </div>
                  <CalendlyEmbed url={CALENDLY_URL} />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
