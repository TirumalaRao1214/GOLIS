import './styles/globals.css';
import Navbar from './components/Navbar';
import Hero from './components/hero/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Why from './components/Why';
import Process from './components/Process';
import DemoCTA from './components/DemoCTA';
import Pricing from './components/Pricing';
import About from './components/About';
import Trust from './components/Trust';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/chatbot/Chatbot';

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Portfolio />
        <Why />
        <Process />
        <DemoCTA />
        <Pricing />
        <About />
        <Trust />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </>
  );
}
