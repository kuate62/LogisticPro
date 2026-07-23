import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, Menu, X, User, LayoutDashboard, UserCircle, Settings, LogOut, Mail, Phone, MapPin } from 'lucide-react';
import './PublicLayout.css';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/track', label: 'Suivre un colis' },
  { to: '/services', label: 'Services' },
  { to: '/agences', label: 'Agences' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // mobile menu closes via onClick={closeMobile} on each link

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserNav = (path) => { setUserOpen(false); navigate(path); };

  return (
    <div className="pp-landing-layout">
      <nav className={`pp-nav ${scrolled ? 'pp-nav--scrolled' : ''}`}>
        <div className="pp-nav__inner">
          <Link to="/" className="pp-nav__brand">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#2563EB" />
              <path d="M8 16L14 10L20 16L14 22L8 16Z" fill="white" fillOpacity="0.9" />
              <path d="M14 16L20 10L26 16L20 22L14 16Z" fill="white" fillOpacity="0.6" />
            </svg>
            <span className="pp-nav__name">LogisticPro</span>
          </Link>

          <div className="pp-nav__links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`pp-nav__link ${isActive(link.to) ? 'pp-nav__link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pp-nav__right">
            <Link to="/track" className="pp-nav__track">
              <Package size={16} />
              Suivre mon colis
            </Link>
            <div className="pp-nav__user-wrap" ref={userRef}>
              <button
                className="pp-nav__user"
                onClick={() => setUserOpen(!userOpen)}
                aria-label="Menu utilisateur"
              >
                <User size={20} />
              </button>
              <div className={`pp-nav__dropdown ${userOpen ? 'pp-nav__dropdown--open' : ''}`}>
                <button className="pp-nav__dropdown-item" onClick={() => handleUserNav('/dashboard')}>
                  <LayoutDashboard size={16} /> Tableau de bord
                </button>
                <button className="pp-nav__dropdown-item" onClick={() => handleUserNav('/clients')}>
                  <UserCircle size={16} /> Profil
                </button>
                <button className="pp-nav__dropdown-item" onClick={() => handleUserNav('/dashboard')}>
                  <Settings size={16} /> Paramètres
                </button>
                <div className="pp-nav__dropdown-separator" />
                <button className="pp-nav__dropdown-item" onClick={() => handleUserNav('/login')}>
                  <LogOut size={16} /> Connexion
                </button>
              </div>
            </div>
            <button
              className="pp-nav__hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`pp-nav__mobile ${mobileOpen ? 'pp-nav__mobile--open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`pp-nav__mobile-link ${isActive(link.to) ? 'pp-nav__mobile-link--active' : ''} ${link.to === '/track' ? 'pp-nav__mobile-link--primary' : ''}`}
            onClick={closeMobile}
          >
            {link.label}
          </Link>
        ))}
        <div className="pp-nav__mobile-divider" />
        <Link to="/login" className="pp-nav__mobile-link" onClick={closeMobile}>
          Connexion
        </Link>
        <Link to="/register" className="pp-nav__mobile-link pp-nav__mobile-link--primary" onClick={closeMobile}>
          S'inscrire
        </Link>
      </div>

      <main className="pp-landing-main">
        <Outlet />
      </main>

      <footer className="lp-footer">
        <div className="lp-footer__inner">
          <div className="lp-footer__brand">
            <div className="lp-footer__logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#2563EB" />
                <path d="M8 16L14 10L20 16L14 22L8 16Z" fill="white" fillOpacity="0.9" />
                <path d="M14 16L20 10L26 16L20 22L14 16Z" fill="white" fillOpacity="0.6" />
              </svg>
              <span>LogisticPro</span>
            </div>
            <p className="lp-footer__desc">
              Plateforme SaaS de gestion logistique pour les entreprises de transport au Cameroun.
            </p>
          </div>

          <div className="lp-footer__col">
            <h4>Liens rapides</h4>
            <Link to="/">Accueil</Link>
            <Link to="/services">Services</Link>
            <Link to="/track">Suivre un colis</Link>
            <Link to="/faq">FAQ</Link>
          </div>

          <div className="lp-footer__col">
            <h4>Services</h4>
            <Link to="/services">Suivi de colis</Link>
            <Link to="/services">Gestion des agences</Link>
            <Link to="/services">Paiements mobiles</Link>
            <Link to="/services">Rapports</Link>
          </div>

          <div className="lp-footer__col">
            <h4>Contact</h4>
            <span className="lp-footer__address">
              <Mail size={14} />
              info@logisticpro.com
            </span>
            <span className="lp-footer__address">
              <Phone size={14} />
              +237 699 123 456
            </span>
            <span className="lp-footer__address">
              <MapPin size={14} />
              Douala, Cameroun
            </span>
          </div>
        </div>

        <div className="lp-footer__bottom">
          <p>&copy; 2026 LogisticPro. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
