import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import {
  Building2, Package, MapPin, Shield, Bell, Phone, Mail,
  ArrowRight, Smartphone, Users, CreditCard, ChevronDown,
  Search, Truck, Clock, Navigation,
} from 'lucide-react';
import './Saas.css';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="s-hero">
      <div className="s-hero__bg" />
      <div className="s-hero__pattern" />
      <div className="s-hero__inner">
        <span className="s-hero__badge">Plateforme multi-entreprises</span>
        <h1 className="s-hero__title">
          Choisissez votre <span className="s-hero__highlight">entreprise de transport</span>
        </h1>
        <p className="s-hero__subtitle">
          LogisticPro vous permet de trouver le transporteur idéal, suivre vos colis en temps réel
          et gérer vos envois depuis une plateforme unique.
        </p>
        <div className="s-hero__actions">
          <button className="s-hero__btn s-hero__btn--primary" onClick={() => navigate('/entreprises')}>
            Trouver une entreprise <ArrowRight size={16} />
          </button>
          <button className="s-hero__btn s-hero__btn--outline" onClick={() => navigate('/entreprises')}>
            <Building2 size={16} /> Voir toutes les entreprises
          </button>
        </div>
        <div className="s-hero__scroll">
          <ChevronDown size={24} />
        </div>
      </div>
      <div className="s-hero__illustration" aria-hidden="true">
        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="60" y="40" width="280" height="220" rx="12" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
          <rect x="80" y="60" width="40" height="12" rx="4" fill="white" fillOpacity="0.1" />
          <rect x="130" y="60" width="80" height="12" rx="4" fill="white" fillOpacity="0.15" />
          <rect x="80" y="88" width="240" height="1" fill="white" fillOpacity="0.06" />
          <rect x="80" y="104" width="60" height="8" rx="4" fill="white" fillOpacity="0.08" />
          <rect x="150" y="104" width="60" height="8" rx="4" fill="white" fillOpacity="0.08" />
          <rect x="220" y="104" width="60" height="8" rx="4" fill="white" fillOpacity="0.08" />
          <rect x="80" y="130" width="100" height="10" rx="5" fill="#2563EB" fillOpacity="0.3" />
          <rect x="80" y="150" width="220" height="40" rx="6" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
          <rect x="90" y="160" width="10" height="10" rx="3" fill="#2563EB" fillOpacity="0.5" />
          <rect x="108" y="162" width="60" height="6" rx="3" fill="white" fillOpacity="0.12" />
          <rect x="80" y="200" width="220" height="40" rx="6" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
          <rect x="90" y="210" width="10" height="10" rx="3" fill="#22C55E" fillOpacity="0.5" />
          <rect x="108" y="212" width="80" height="6" rx="3" fill="white" fillOpacity="0.12" />
          <circle cx="310" cy="180" r="16" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
          <path d="M304 180L308 184L316 176" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      icon: Building2, number: '01',
      title: 'Choisir une entreprise',
      desc: 'Parcourez notre catalogue de transporteurs partenaires et sélectionnez celui qui correspond à vos besoins.',
    },
    {
      icon: MapPin, number: '02',
      title: 'Choisir une agence',
      desc: 'Trouvez l\'agence la plus proche de chez vous parmi le réseau d\'agences de votre transporteur.',
    },
    {
      icon: Package, number: '03',
      title: 'Suivre son colis',
      desc: 'Utilisez le numéro de suivi pour connaître la position exacte de votre colis à chaque étape.',
    },
  ];

  return (
    <section className="s-section">
      <div className="s-section__container">
        <div className="s-section__header">
          <span className="s-section__tag">Fonctionnement</span>
          <h2 className="s-section__title">Comment suivre un colis ?</h2>
          <p className="s-section__subtitle">Trois étapes simples pour envoyer et suivre vos colis</p>
        </div>
        <div className="s-how">
          {steps.map((step, i) => (
            <div key={step.number} className="s-how__step-wrap">
              <div className="s-how__step">
                <div className="s-how__number">{step.number}</div>
                <div className="s-how__icon"><step.icon size={28} /></div>
                <h3 className="s-how__step-title">{step.title}</h3>
                <p className="s-how__step-desc">{step.desc}</p>
              </div>
              {i < steps.length - 1 && <div className="s-how__arrow" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortalPreviewSection() {
  return (
    <section className="s-section s-section--alt">
      <div className="s-section__container">
        <div className="s-section__header">
          <span className="s-section__tag">Découverte</span>
          <h2 className="s-section__title">Ce que vous trouverez sur le portail de chaque entreprise</h2>
          <p className="s-section__subtitle">Chaque transporteur dispose de son espace public personnalisé avec tous les outils nécessaires</p>
        </div>

        <div className="s-portal-mockup">
          <div className="s-portal-mockup__header">
            <div className="s-portal-mockup__brand">
              <div className="s-portal-mockup__logo">CT</div>
              <div>
                <div className="s-portal-mockup__name">Cameroon Trans</div>
                <div className="s-portal-mockup__status">Transport urbain · Vérifiée</div>
              </div>
            </div>
            <div className="s-portal-mockup__nav">
              <span className="s-portal-mockup__nav-item s-portal-mockup__nav-item--active">Accueil</span>
              <span className="s-portal-mockup__nav-item">Services</span>
              <span className="s-portal-mockup__nav-item">Agences</span>
              <span className="s-portal-mockup__nav-item">Tarifs</span>
              <span className="s-portal-mockup__nav-item">Contact</span>
            </div>
          </div>
          <div className="s-portal-mockup__body">
            <div className="s-portal-mockup__grid">
              <div className="s-portal-mockup__card s-portal-mockup__card--primary">
                <div className="s-portal-mockup__card-icon"><Search size={18} /></div>
                <div className="s-portal-mockup__card-label">Suivi des colis</div>
                <div className="s-portal-mockup__card-desc">Suivi en temps réel</div>
              </div>
              <div className="s-portal-mockup__card">
                <div className="s-portal-mockup__card-icon"><MapPin size={18} /></div>
                <div className="s-portal-mockup__card-label">Liste des agences</div>
                <div className="s-portal-mockup__card-desc">Réseau national</div>
              </div>
              <div className="s-portal-mockup__card">
                <div className="s-portal-mockup__card-icon"><Package size={18} /></div>
                <div className="s-portal-mockup__card-label">Services</div>
                <div className="s-portal-mockup__card-desc">Transport, express, fret</div>
              </div>
              <div className="s-portal-mockup__card">
                <div className="s-portal-mockup__card-icon"><CreditCard size={18} /></div>
                <div className="s-portal-mockup__card-label">Tarifs</div>
                <div className="s-portal-mockup__card-desc">Estimation en ligne</div>
              </div>
              <div className="s-portal-mockup__card">
                <div className="s-portal-mockup__card-icon"><Mail size={18} /></div>
                <div className="s-portal-mockup__card-label">Coordonnées</div>
                <div className="s-portal-mockup__card-desc">Contact & horaires</div>
              </div>
              <div className="s-portal-mockup__card">
                <div className="s-portal-mockup__card-icon"><Bell size={18} /></div>
                <div className="s-portal-mockup__card-label">Notifications</div>
                <div className="s-portal-mockup__card-desc">Alertes SMS</div>
              </div>
            </div>
            <div className="s-portal-mockup__tracking">
              <Truck size={16} />
              <span>En transit ·</span>
              <span>Arrivée prévue aujourd'hui</span>
              <Clock size={14} />
              <span>Mise à jour il y a 2 min</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const reasons = [
    { icon: Users, title: 'Multi-entreprises', desc: 'Comparez et choisissez parmi plusieurs transporteurs partenaires.' },
    { icon: Smartphone, title: 'Suivi en temps réel', desc: 'Suivez vos colis depuis n\'importe quel appareil, sans inscription.' },
    { icon: Shield, title: 'Colis assurés', desc: 'Tous les envois sont couverts par une assurance intégrée.' },
    { icon: Bell, title: 'Notifications SMS', desc: 'Soyez informé à chaque étape du parcours de votre colis.' },
    { icon: CreditCard, title: 'Paiement flexible', desc: 'Espèces, Orange Money, MTN Mobile Money, ou à la livraison.' },
    { icon: Navigation, title: 'Réseau national', desc: 'Des agences dans toutes les grandes villes du Cameroun.' },
  ];

  return (
    <section className="s-section">
      <div className="s-section__container">
        <div className="s-section__header">
          <span className="s-section__tag">Pourquoi LogisticPro</span>
          <h2 className="s-section__title">Pourquoi passer par notre plateforme ?</h2>
          <p className="s-section__subtitle">Une solution unique pour tous vos besoins de transport</p>
        </div>
        <Row className="g-4">
          {reasons.map((r) => (
            <Col key={r.title} md={4} sm={6}>
              <div className="s-why-card">
                <div className="s-why-card__icon"><r.icon size={22} /></div>
                <h3 className="s-why-card__title">{r.title}</h3>
                <p className="s-why-card__desc">{r.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
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
          <a href="/entreprises">Entreprises</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="lp-footer__col">
          <h4>Services</h4>
          <a href="/entreprises">Suivi de colis</a>
          <a href="/entreprises">Gestion des agences</a>
          <a href="/entreprises">Paiements mobiles</a>
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

export default function SaasHomePage() {
  return (
    <div className="s-page">
      <HeroSection />
      <HowItWorksSection />
      <PortalPreviewSection />
      <WhySection />
      <FooterSection />
    </div>
  );
}
