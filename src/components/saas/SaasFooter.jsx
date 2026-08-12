import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function SaasFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-footer__inner">
        <div className="lp-footer__brand">
          <div className="lp-footer__logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <p className="lp-footer__desc">
            Plateforme SaaS de gestion logistique pour les entreprises de transport au Cameroun.
          </p>
        </div>

        <div className="lp-footer__col">
          <h4>Liens rapides</h4>
          <Link to="/">Accueil</Link>
          <Link to="/entreprises">Entreprises</Link>
          <Link to="/devenir-partenaire">Devenir partenaire</Link>
        </div>

        <div className="lp-footer__col">
          <h4>Services</h4>
          <Link to="/suivi">Suivi de colis</Link>
          <Link to="/entreprises">Gestion des agences</Link>
          <Link to="/entreprises">Paiements mobiles</Link>
        </div>

        <div className="lp-footer__col">
          <h4>Contact</h4>
          <span className="lp-footer__address">
            <Mail size={14} /> info@logisticpro.com
          </span>
          <span className="lp-footer__address">
            <Phone size={14} /> +237 699 123 456
          </span>
          <span className="lp-footer__address">
            <MapPin size={14} /> Douala, Cameroun
          </span>
        </div>
      </div>

      <div className="lp-footer__bottom">
        <p>&copy; 2026 LogisticPro. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
