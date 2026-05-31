import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import About        from './components/About'
import Departments  from './components/Departments'
import Portfolio    from './components/Portfolio'
import Contact      from './components/Contact'
import Footer       from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
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
