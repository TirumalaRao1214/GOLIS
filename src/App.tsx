import { lazy, Suspense } from 'react';
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

// AI sections — lazy-loaded to keep initial bundle lean
const AISolutions = lazy(() => import('./components/ai/AISolutions'));
const AILab = lazy(() => import('./components/ai/AILab'));
const AIArchitecture = lazy(() => import('./components/ai/AIArchitecture'));
const AIBusinessBuilder = lazy(() => import('./components/ai/AIBusinessBuilder'));
const AIUseCases = lazy(() => import('./components/ai/AIUseCases'));
const AIIntegrations = lazy(() => import('./components/ai/AIIntegrations'));
const AIPricing = lazy(() => import('./components/ai/AIPricing'));

function SectionFallback() {
  return <div style={{ minHeight: 200 }} aria-hidden="true" />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <AISolutions />
        </Suspense>
        <Services />
        <Suspense fallback={<SectionFallback />}>
          <AIArchitecture />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AIUseCases />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AILab />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AIBusinessBuilder />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AIIntegrations />
        </Suspense>
        <Portfolio />
        <Why />
        <Process />
        <DemoCTA />
        <Suspense fallback={<SectionFallback />}>
          <AIPricing />
        </Suspense>
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
