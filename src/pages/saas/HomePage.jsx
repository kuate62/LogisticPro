import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import {
  ArrowRight, Building2, ChevronDown, CircleCheck, Clock,
  CreditCard, FileText, Globe, MapPin, Navigation, Package, Phone, Rocket,
  Search, Shield, Smartphone, Truck, Users, Bell,
} from 'lucide-react';
import './Saas.css';

function HeroSection() {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    const number = trackingNumber.trim();
    navigate(number ? `/suivi?number=${encodeURIComponent(number)}` : '/suivi');
  };

  return (
    <section className="s-hero">
      <div className="s-hero__bg" />
      <div className="s-hero__pattern" />
      <div className="s-hero__inner">
        <span className="s-hero__badge">Plateforme de suivi &amp; transport</span>
        <h1 className="s-hero__title">
          Suivez vos colis <span className="s-hero__highlight">en temps réel</span>
        </h1>
        <p className="s-hero__subtitle">
          Entrez votre numéro de suivi ou trouvez votre entreprise de transport parmi nos
          partenaires pour suivre chaque étape de votre envoi.
        </p>

        <form className="s-hero__search" onSubmit={handleTrack} role="search">
          <div className="s-hero__search-field">
            <Search size={18} />
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Ex : SUI-20260701-001"
              aria-label="Numéro de suivi de colis"
            />
          </div>
          <button type="submit" className="s-hero__btn s-hero__btn--primary">
            <Navigation size={16} /> Suivre un colis
          </button>
        </form>

        <div className="s-hero__actions">
          <button className="s-hero__btn s-hero__btn--outline" onClick={() => navigate('/entreprises')}>
            <Building2 size={16} /> Trouver une entreprise
          </button>
        </div>

        <div className="s-hero__trust">
          <span><Clock size={14} /> Temps réel</span>
          <span><Shield size={14} /> Sans inscription</span>
          <span><Phone size={14} /> Support 7j/7</span>
        </div>

        <div className="s-hero__scroll">
          <ChevronDown size={24} />
        </div>
      </div>
      <div className="s-hero__illustration" aria-hidden="true">
        <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="16" width="320" height="288" rx="20" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
          <rect x="60" y="40" width="150" height="12" rx="6" fill="white" fillOpacity="0.12" />
          <rect x="300" y="36" width="40" height="20" rx="10" fill="#22C55E" fillOpacity="0.25" />
          <circle cx="320" cy="46" r="3" fill="#22C55E" fillOpacity="0.9" />
          <path d="M200 88 L258 117 L200 146 L142 117 Z" fill="#2563EB" fillOpacity="0.25" stroke="#60A5FA" strokeWidth="2" strokeLinejoin="round" />
          <path d="M200 146 L200 204" stroke="#60A5FA" strokeWidth="2" />
          <path d="M142 117 L142 175 L200 204" stroke="#60A5FA" strokeWidth="2" opacity="0.55" />
          <path d="M258 117 L258 175 L200 204" stroke="#60A5FA" strokeWidth="2" opacity="0.55" />
          <path d="M70 240 C 140 198, 260 282, 330 240" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 6" fill="none" />
          <circle cx="70" cy="240" r="7" fill="#2563EB" fillOpacity="0.65" />
          <circle cx="200" cy="256" r="5" fill="#60A5FA" />
          <circle cx="330" cy="240" r="7" fill="#22C55E" fillOpacity="0.85" />
          <rect x="60" y="266" width="12" height="12" rx="4" fill="#22C55E" fillOpacity="0.7" />
          <rect x="80" y="272" width="90" height="6" rx="3" fill="white" fillOpacity="0.16" />
          <rect x="60" y="288" width="180" height="6" rx="3" fill="white" fillOpacity="0.1" />
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
      icon: Package, number: '02',
      title: 'Déposer votre colis',
      desc: 'Remettez votre colis à l\'agence de l\'entreprise choisie, près de chez vous.',
    },
    {
      icon: FileText, number: '03',
      title: 'Recevoir votre numéro de suivi',
      desc: 'Chaque colis reçoit un numéro de suivi unique pour rester informé à chaque étape.',
    },
    {
      icon: Navigation, number: '04',
      title: 'Suivre en temps réel',
      desc: 'Suivez votre colis à chaque étape du parcours, sans inscription, depuis n\'importe quel appareil.',
    },
    {
      icon: MapPin, number: '05',
      title: 'Retirer votre colis',
      desc: 'Vous êtes alerté dès l\'arrivée pour retirer votre colis à l\'agence de destination.',
    },
  ];

  return (
    <section className="s-section">
      <div className="s-section__container">
        <div className="s-section__header">
          <span className="s-section__tag">Fonctionnement</span>
          <h2 className="s-section__title">Comment ça fonctionne ?</h2>
          <p className="s-section__subtitle">Suivez votre colis en 5 étapes simples</p>
        </div>
        <div className="s-how">
          {steps.map((step) => (
            <div key={step.number} className="s-how__item">
              <div className="s-how__rail">
                <div className="s-how__icon"><step.icon size={22} /></div>
                <div className="s-how__line" />
              </div>
              <div className="s-how__content">
                <span className="s-how__number">{step.number}</span>
                <h3 className="s-how__step-title">{step.title}</h3>
                <p className="s-how__step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
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
    <section className="s-section s-section--alt">
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

function PartnerCTASection() {
  const navigate = useNavigate();
  const points = [
    { icon: Globe, text: 'Votre entreprise visible par des milliers d\'utilisateurs' },
    { icon: Navigation, text: 'Suivi de colis en temps réel offert à vos clients' },
    { icon: Smartphone, text: 'Paiements mobiles intégrés (Orange Money, MTN)' },
    { icon: Truck, text: 'Gestion centralisée de vos colis et de vos agences' },
  ];

  return (
    <section className="s-section">
      <div className="s-section__container">
        <div className="s-partner">
          <div className="s-partner__content">
            <span className="s-section__tag">Devenir partenaire</span>
            <h2 className="s-partner__title">Proposez vos services sur LogisticPro</h2>
            <p className="s-partner__subtitle">
              Rejoignez le réseau des entreprises de transport camerounaises et développez votre
              activité avec des outils modernes de suivi et de gestion.
            </p>
            <ul className="s-partner__list">
              {points.map((p) => (
                <li key={p.text}>
                  <CircleCheck size={17} />
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
            <button className="s-hero__btn s-hero__btn--primary" onClick={() => navigate('/devenir-partenaire')}>
              Devenir partenaire <ArrowRight size={16} />
            </button>
          </div>
          <div className="s-partner__card">
            <div className="s-partner__card-icon"><Rocket size={24} /></div>
            <h3 className="s-partner__card-title">Lancez votre activité en quelques jours</h3>
            <p className="s-partner__card-text">
              Remplissez le formulaire de demande, validez votre dossier et configurez votre
              espace avec la formule de votre choix.
            </p>
            <div className="s-partner__card-price">
              <strong>25 000 FCFA</strong><span>/ mois</span>
            </div>
            <button className="s-hero__btn s-hero__btn--primary" onClick={() => navigate('/devenir-partenaire')}>
              Postuler maintenant <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SaasHomePage() {
  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <WhySection />
      <PartnerCTASection />
    </div>
  );
}

export default SaasHomePage;
