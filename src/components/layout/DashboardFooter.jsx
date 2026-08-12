import { Link } from 'react-router-dom';
import { FileText, LifeBuoy, Lock, Mail, Phone } from 'lucide-react';
import './DashboardFooter.css';

const NAV_LINKS = {
  client: [
    { to: '/dashboard/client/tableau-de-bord', label: 'Tableau de bord' },
    { to: '/dashboard/client/suivi', label: 'Suivi de colis' },
    { to: '/dashboard/client/paiements', label: 'Paiements' },
    { to: '/dashboard/client/profil', label: 'Mon profil' },
  ],
  agent: [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/packages', label: 'Colis' },
    { to: '/shipments', label: 'Expéditions' },
    { to: '/tracking', label: 'Suivi' },
  ],
};

export function DashboardFooter({ variant = 'agent' }) {
  const isClient = variant === 'client';
  const links = NAV_LINKS[variant] || NAV_LINKS.agent;

  return (
    <footer className={`dash-footer${isClient ? '' : ' dash-footer--minimal'}`}>
      {isClient && (
        <div className="dash-footer__inner">
          <div className="dash-footer__brand">
            <div className="dash-footer__logo">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#863bff" />
                <g transform="translate(4 3.5)" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                  <path d="M12 22V12" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <path d="m7.5 4.27 9 5.15" />
                </g>
              </svg>
              <span>LogisticPro</span>
            </div>
            <p className="dash-footer__desc">
              Votre espace pour suivre vos colis, payer vos envois et gérer vos expéditions en temps réel.
            </p>
          </div>

          <div className="dash-footer__col">
            <h4>Accès rapide</h4>
            {links.map((l) => (
              <Link key={l.label} to={l.to}>{l.label}</Link>
            ))}
          </div>

          <div className="dash-footer__col">
            <h4>Assistance</h4>
            <span className="dash-footer__address"><Mail size={14} /> support@logisticpro.cm</span>
            <span className="dash-footer__address"><Phone size={14} /> +237 699 123 456</span>
            <Link to="/"><LifeBuoy size={14} /> Centre d'aide</Link>
          </div>

          <div className="dash-footer__col">
            <h4>Informations</h4>
            <Link to="/"><FileText size={14} /> Mentions légales</Link>
            <Link to="/"><Lock size={14} /> Confidentialité</Link>
            <Link to="/"><FileText size={14} /> CGU</Link>
          </div>
        </div>
      )}

      <div className="dash-footer__bottom">
        <div className="dash-footer__bottom-inner">
          <p>&copy; 2026 LogisticPro. Tous droits réservés.</p>
          {isClient && <p>Espace client sécurisé</p>}
        </div>
      </div>
    </footer>
  );
}

export default DashboardFooter;
