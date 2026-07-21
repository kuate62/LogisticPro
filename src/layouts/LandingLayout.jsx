import { useState, useEffect, useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserCircle, Menu, X, Package, User, FileText, LogIn, UserPlus, Mail, Phone, MapPin } from 'lucide-react';
import './LandingLayout.css';

export function LandingLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="lp-landing-layout">
      <nav className={`lp-nav ${scrolled ? 'lp-nav--scrolled' : ''}`}>
        <div className="lp-nav__inner">
          <Link to="/" className="lp-nav__brand">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#2563EB" />
              <path d="M8 16L14 10L20 16L14 22L8 16Z" fill="white" fillOpacity="0.9" />
              <path d="M14 16L20 10L26 16L20 22L14 16Z" fill="white" fillOpacity="0.6" />
            </svg>
            <span className="lp-nav__name">LogisticPro</span>
          </Link>

          <div className="lp-nav__links">
            <Link to="/" className="lp-nav__link">Accueil</Link>
            <a href="#services" className="lp-nav__link">Services</a>
            <a href="#agences" className="lp-nav__link">Nos agences</a>
            <a href="#faq" className="lp-nav__link">FAQ</a>
            <a href="#contact" className="lp-nav__link">Contact</a>
          </div>

          <div className="lp-nav__right">
            <Link to="/track" className="lp-nav__track">
              <Package size={15} />
              Suivre mon colis
            </Link>

            <div className="lp-nav__user-wrap" ref={dropdownRef}>
              <button
                className="lp-nav__user"
                onClick={() => setDropdownOpen((o) => !o)}
                aria-label="Menu utilisateur"
              >
                <UserCircle size={24} />
              </button>

              <div className={`lp-nav__dropdown ${dropdownOpen ? 'lp-nav__dropdown--open' : ''}`}>
                <Link to="/login" className="lp-nav__dropdown-item" onClick={() => setDropdownOpen(false)}>
                  <User size={16} />
                  Tableau de bord
                </Link>
                <Link to="/login" className="lp-nav__dropdown-item" onClick={() => setDropdownOpen(false)}>
                  <FileText size={16} />
                  Mon profil
                </Link>
                <div className="lp-nav__dropdown-separator" />
                <Link to="/login" className="lp-nav__dropdown-item" onClick={() => setDropdownOpen(false)}>
                  <LogIn size={16} />
                  Se connecter
                </Link>
                <Link to="/register" className="lp-nav__dropdown-item" onClick={() => setDropdownOpen(false)}>
                  <UserPlus size={16} />
                  S'inscrire
                </Link>
              </div>
            </div>

            <button
              className="lp-nav__hamburger"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`lp-nav__mobile ${mobileOpen ? 'lp-nav__mobile--open' : ''}`}>
        <Link to="/" className="lp-nav__mobile-link" onClick={closeMobile}>Accueil</Link>
        <a href="#services" className="lp-nav__mobile-link" onClick={closeMobile}>Services</a>
        <a href="#agences" className="lp-nav__mobile-link" onClick={closeMobile}>Nos agences</a>
        <a href="#faq" className="lp-nav__mobile-link" onClick={closeMobile}>FAQ</a>
        <a href="#contact" className="lp-nav__mobile-link" onClick={closeMobile}>Contact</a>
        <div className="lp-nav__mobile-divider" />
        <Link to="/track" className="lp-nav__mobile-link lp-nav__mobile-link--primary" onClick={closeMobile}>
          <Package size={18} />
          Suivre mon colis
        </Link>
        <Link to="/login" className="lp-nav__mobile-link" onClick={closeMobile}>Se connecter</Link>
        <Link to="/register" className="lp-nav__mobile-link lp-nav__mobile-link--primary" onClick={closeMobile}>S'inscrire</Link>
      </div>

      <main className="lp-landing-main">
        <Outlet />
      </main>

      <footer className="lp-footer">
        <div className="lp-footer__inner">
          <div className="lp-footer__brand">
            <div className="lp-footer__logo">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <a href="#features">Fonctionnalités</a>
            <a href="#pricing">Tarifs</a>
            <a href="#how-it-works">Comment ça marche</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="lp-footer__col">
            <h4>Services</h4>
            <a href="#services">Suivi de colis</a>
            <a href="#services">Gestion des agences</a>
            <a href="#services">Paiements mobiles</a>
            <a href="#services">Rapports</a>
          </div>

          <div className="lp-footer__col">
            <h4>Contact</h4>
            <a href="mailto:info@logisticpro.com">
              <Mail size={14} />
              info@logisticpro.com
            </a>
            <a href="tel:+237699123456">
              <Phone size={14} />
              +237 699 123 456
            </a>
            <p className="lp-footer__address">
              <MapPin size={14} />
              Douala, Cameroun
            </p>
          </div>
        </div>

        <div className="lp-footer__bottom">
          <p>&copy; {new Date().getFullYear()} LogisticPro. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingLayout;
