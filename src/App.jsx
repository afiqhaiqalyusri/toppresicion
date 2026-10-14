import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Capabilities from './pages/Capabilities';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Certificates from './pages/Certificates';
import Policies from './pages/Policies';
import Facilities from './pages/Facilities';
import ServiceDetail from './pages/ServiceDetail';
import AdminDashboard from './pages/AdminDashboard';
import { useEffect, useState } from 'react';

function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max((window.scrollY / totalHeight) * 100, 0), 100);
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${scrollProgress}%`,
        background: 'linear-gradient(90deg, #1a56db 0%, #3b82f6 50%, #60a5fa 100%)',
        boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)',
        zIndex: 99999,
        transition: 'width 0.1s ease-out',
        pointerEvents: 'none'
      }}
    />
  );
}

function ScrollAndObserver() {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.hash) {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        window.scrollTo(0, 0);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    // Give React a moment to render the new DOM elements before observing
    const timer = setTimeout(() => {
      // 1. Scroll Reveal Animation
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

      // 2. Count Up Animation for Statistics
      const animateValue = (obj, start, end, duration, prefix, suffix, isFloat) => {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          const current = start + easeProgress * (end - start);
          
          if (isFloat) {
            obj.innerHTML = prefix + current.toFixed(1) + suffix;
          } else {
            obj.innerHTML = prefix + Math.floor(current) + suffix;
          }
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            obj.innerHTML = prefix + end + suffix;
          }
        };
        window.requestAnimationFrame(step);
      };

      const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.innerText.trim();
            const match = text.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
            if (match && !el.classList.contains('counted')) {
              const prefix = match[1] || '';
              const number = parseFloat(match[2]);
              const suffix = match[3] || '';
              const isFloat = text.includes('.');
              
              el.classList.add('counted');
              animateValue(el, 0, number, 2000, prefix, suffix, isFloat);
            }
            statObserver.unobserve(el);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.stat-number, .cert-stat-val, .key-metric-val').forEach(el => statObserver.observe(el));
      
      // Cleanup observers on unmount or before next effect run
      return () => {
        observer.disconnect();
        statObserver.disconnect();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}

function NotFound() {
  return (
    <main className="page-main" style={{ padding: '120px 20px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#eff6ff', color: '#1a56db', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.8rem', fontWeight: 800 }}>
        !
      </div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text)', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>Page Not Found</h1>
      <p style={{ maxWidth: '480px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '28px', fontSize: '1.05rem' }}>
        The page or manufacturing capability you are looking for does not exist or may have been updated.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary" style={{ padding: '12px 24px', borderRadius: '8px' }}>
          Back to Homepage
        </Link>
        <Link to="/capabilities" className="btn btn-outline" style={{ padding: '12px 24px', borderRadius: '8px' }}>
          Explore Capabilities
        </Link>
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="*" element={
          <>
            <ScrollProgressBar />
            <ScrollAndObserver />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/capabilities" element={<Capabilities />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/:slug" element={<ServiceDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
