import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import About          from './components/About'
import Departments    from './components/Departments'
import Portfolio      from './components/Portfolio'
import Contact        from './components/Contact'
import Footer         from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

// DROP LOGO FILE INTO /public/ folder and update this path
// e.g. if you add logo.png to public folder, set: const LOGO = '/logo.png'
const LOGO = '/logo.png' // set to '/logo.png' once you add the logo file

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar logo={LOGO} />
      <main>
        <Hero />
        <About />
        <Departments />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
