import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import { useEffect } from 'react';

function ScrollAndObserver() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="*" element={
          <>
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
              <Route path="/:slug" element={<ServiceDetail />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
