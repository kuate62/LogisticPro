import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AuthLogo } from '../components/auth';
import SaasFooter from '../components/saas/SaasFooter';
import './SaaSLayout.css';

const NAV_ITEMS = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/entreprises', label: 'Entreprises' },
  { to: '/suivi', label: 'Suivi de colis' },
];

function HeaderLink({ to, end, label, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) => `saas-nav__link${isActive ? ' is-active' : ''}`}
    >
      {label}
    </NavLink>
  );
}

export function SaaSLayout() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="saas-layout">
      <header className="saas-layout__header">
        <div className="saas-layout__bar">
          <NavLink to="/" className="saas-layout__brand" aria-label="LogisticPro — Accueil">
            <AuthLogo />
          </NavLink>

          <nav className="saas-layout__links" aria-label="Navigation principale">
            {NAV_ITEMS.map((item) => <HeaderLink key={item.to} {...item} />)}
          </nav>

          <div className="saas-layout__actions">
            <NavLink to="/login" className="saas-layout__login">Se connecter</NavLink>
            <NavLink to="/devenir-partenaire" className="saas-layout__cta">
              Devenir partenaire <ArrowUpRight size={14} />
            </NavLink>
          </div>

          <button
            type="button"
            className="saas-layout__burger"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="saas-layout__mobile">
            <nav aria-label="Navigation mobile">
              {NAV_ITEMS.map((item) => <HeaderLink key={item.to} {...item} onClick={close} />)}
            </nav>
            <div className="saas-layout__mobile-actions">
              <NavLink to="/login" className="saas-layout__login" onClick={close}>Se connecter</NavLink>
              <NavLink to="/devenir-partenaire" className="saas-layout__cta" onClick={close}>
                Devenir partenaire <ArrowUpRight size={14} />
              </NavLink>
            </div>
          </div>
        )}
      </header>

      <main className="saas-layout__main">
        <Outlet />
      </main>

      <SaasFooter />
    </div>
  );
}

export default SaaSLayout;
