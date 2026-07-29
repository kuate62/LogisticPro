import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import {
  Search, Package, MapPin, CreditCard,
  Truck, Clock, Bell, Shield, Zap,
  ArrowRight, Users, Weight, Store, Ship,
} from 'lucide-react';
import SectionHeader from '../../components/public/SectionHeader';
import CTABanner from '../../components/public/CTABanner';
import './HomePage.css';

function HeroSection() {
  const { idEntreprise } = useParams();
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      navigate(`/entreprises/${idEntreprise}/suivi?number=${encodeURIComponent(trackingNumber.trim())}`);
    }
  };

  return (
    <section className="lp-hero">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="lp-hero__content">
              <span className="lp-hero__badge">Leader du transport de colis au Cameroun</span>
              <h1 className="lp-hero__title">
                Votre colis livré partout au Cameroun{' '}
                <span className="lp-hero__highlight">en toute confiance</span>
              </h1>
              <p className="lp-hero__subtitle">
                Envoyez et recevez vos colis dans tout le Cameroun. Bénéficiez d'un suivi en temps réel,
                de paiements sécurisés et d'un réseau de 26 agences à travers le pays.
              </p>
              <form className="lp-hero__search" onSubmit={handleTrack}>
                <Search size={20} className="lp-hero__search-icon" />
                <input
                  type="text"
                  placeholder="Saisissez votre numéro de suivi..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
                <button type="submit">Suivre</button>
              </form>
              <div className="lp-hero__trust">
                <div className="lp-hero__avatars">
                  {[
                    { color: '#2563EB', initials: 'JD' },
                    { color: '#7C3AED', initials: 'AM' },
                    { color: '#059669', initials: 'NF' },
                    { color: '#D97706', initials: 'CK' },
                    { color: '#DC2626', initials: 'IO' },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className="lp-hero__avatar"
                      style={{ backgroundColor: a.color }}
                    >
                      {a.initials}
                    </div>
                  ))}
                </div>
                <p className="lp-hero__trust-text">
                  <strong>+3 850 clients</strong> nous font confiance
                </p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="lp-hero__visual">
              <div className="lp-hero__visual-card lp-hero__visual-card--main">
                <div className="lp-hero__tracking-header">
                  <Truck size={20} style={{ color: 'var(--color-primary)' }} />
                  <span>Colis #EXP-2026</span>
                  <span className="lp-hero__tracking-badge">En transit</span>
                </div>
                <div className="lp-hero__tracking-route">
                  <div className="lp-hero__tracking-point">
                    <MapPin size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    <div>
                      <small>Douala</small>
                      <strong>Départ le 15/07</strong>
                    </div>
                  </div>
                  <div className="lp-hero__tracking-line">
                    <div className="lp-hero__tracking-dot lp-hero__tracking-dot--active" />
                    <div className="lp-hero__tracking-progress" />
                    <div className="lp-hero__tracking-dot" />
                  </div>
                  <div className="lp-hero__tracking-point">
                    <MapPin size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                    <div>
                      <small>Yaoundé</small>
                      <strong>Arrivée prévue 20/07</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lp-hero__visual-card lp-hero__visual-card--float1">
                <div className="lp-hero__float-icon lp-hero__float-icon--green">
                  <Package size={18} />
                </div>
                <div className="lp-hero__float-text">
                  <strong>Colis livré</strong>
                  <small>Livré avec succès</small>
                </div>
              </div>

              <div className="lp-hero__visual-card lp-hero__visual-card--float2">
                <div className="lp-hero__float-icon lp-hero__float-icon--blue">
                  <CreditCard size={18} />
                </div>
                <div className="lp-hero__float-text">
                  <strong>Paiement reçu</strong>
                  <small>150 000 FCFA</small>
                </div>
              </div>

              <div className="lp-hero__visual-card lp-hero__visual-card--float3">
                <div className="lp-hero__float-icon lp-hero__float-icon--amber">
                  <Bell size={18} />
                </div>
                <div className="lp-hero__float-text">
                  <strong>2 nouvelles notifications</strong>
                  <small>Mise à jour il y a 2 min</small>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { icon: Package, value: '+42 800', label: 'Colis livrés' },
    { icon: MapPin, value: '26', label: 'Agences' },
    { icon: Truck, value: '45+', label: 'Villes desservies' },
    { icon: Users, value: '+3 850', label: 'Clients satisfaits' },
  ];

  return (
    <section className="lp-stats">
      <Container>
        <Row className="g-4 justify-content-center">
          {stats.map((stat) => (
            <Col key={stat.label} xs={6} md={3}>
              <div className="lp-stats__item">
                <div className="lp-stats__icon">
                  <stat.icon size={24} />
                </div>
                <h3 className="lp-stats__value">{stat.value}</h3>
                <p className="lp-stats__label">{stat.label}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

function ServicesPreviewSection() {
  const { idEntreprise } = useParams();
  const navigate = useNavigate();
  const services = [
    {
      icon: Truck,
      title: 'Livraison express',
      desc: 'Livraison en quelques heures dans la même ville et en J+1 en interurbain.',
    },
    {
      icon: Package,
      title: 'Envoi de colis',
      desc: 'Envoyez colis standard et volumineux vers toutes les villes du Cameroun.',
    },
    {
      icon: CreditCard,
      title: 'Paiement à la livraison',
      desc: 'Payez à la réception en espèces, Orange Money ou MTN Mobile Money.',
    },
    {
      icon: Weight,
      title: 'Transport marchandises',
      desc: 'Transport de palettes et marchandises volumineuses avec des véhicules adaptés.',
    },
  ];

  return (
    <section className="lp-services">
      <Container>
        <SectionHeader
          tag="Services"
          title="Des solutions adaptées à vos besoins"
        />
        <Row className="g-4">
          {services.map((s) => (
            <Col key={s.title} md={6} lg={3}>
              <div className="lp-service-card">
                <div className="lp-service-card__icon">
                  <s.icon size={24} />
                </div>
                <h3 className="lp-service-card__title">{s.title}</h3>
                <p className="lp-service-card__desc">{s.desc}</p>
                <button
                  type="button"
                  className="lp-service-card__link"
                  onClick={() => navigate(`/entreprises/${idEntreprise}/services`)}
                >
                  En savoir plus <ArrowRight size={14} />
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

function HowItWorksPreviewSection() {
  const steps = [
    {
      number: '01',
      icon: Store,
      title: 'Passez en agence',
      desc: 'Déposez votre colis dans l\'une de nos 26 agences partenaires',
    },
    {
      number: '02',
      icon: Package,
      title: 'Recevez votre numéro',
      desc: 'Recevez votre numéro de suivi unique par SMS',
    },
    {
      number: '03',
      icon: Truck,
      title: 'Suivez en temps réel',
      desc: 'Suivez votre colis à chaque étape de son parcours',
    },
    {
      number: '04',
      icon: MapPin,
      title: 'Récupérez votre colis',
      desc: 'Réceptionnez votre colis à l\'agence de destination',
    },
  ];

  return (
    <section className="lp-how">
      <Container>
        <SectionHeader
          tag="Processus"
          title="Comment envoyer un colis"
        />
        <div className="lp-how__timeline">
          {steps.map((step) => (
            <div key={step.number} className="lp-how__step">
              <div className="lp-how__step-number">{step.number}</div>
              <div className="lp-how__step-icon">
                <step.icon size={24} />
              </div>
              <h4 className="lp-how__step-title">{step.title}</h4>
              <p className="lp-how__step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function WhyUsSection() {
  const advantages = [
    { icon: Clock, title: 'Livraison rapide', desc: 'Express intra-ville en 2-4h, interurbain en 24-48h' },
    { icon: Bell, title: 'Notifications SMS', desc: 'Alertes à chaque étape de votre envoi' },
    { icon: MapPin, title: 'Réseau national', desc: '26 agences couvrant les 10 régions du Cameroun' },
    { icon: Shield, title: 'Colis assurés', desc: 'Tous vos envois sont couverts par notre assurance' },
    { icon: Ship, title: 'Fret disponible', desc: 'Fret maritime et aérien vers l\'international' },
    { icon: Zap, title: 'Paiement flexible', desc: 'Espèces, Orange Money, MTN MoMo ou à la livraison' },
  ];

  return (
    <section className="lp-advantages">
      <Container>
        <SectionHeader
          tag="Avantages"
          title="Pourquoi nous choisir ?"
          subtitle="Un service fiable et un réseau qui couvre tout le Cameroun"
        />
        <Row className="g-4">
          {advantages.map((a) => (
            <Col key={a.title} md={4} sm={6}>
              <div className="lp-advantage-card">
                <div className="lp-advantage-card__icon">
                  <a.icon size={20} />
                </div>
                <h4 className="lp-advantage-card__title">{a.title}</h4>
                <p className="lp-advantage-card__desc">{a.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default function HomePage() {
  const { idEntreprise } = useParams();
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreviewSection />
      <HowItWorksPreviewSection />
      <WhyUsSection />
      <CTABanner
        title="Prêt à envoyer un colis ?"
        subtitle="Suivez votre colis ou contactez-nous pour un accompagnement personnalisé"
        primaryLabel="Suivre mon colis"
        primaryTo={`/entreprises/${idEntreprise}/suivi`}
        secondaryLabel="Nous contacter"
        secondaryTo={`/entreprises/${idEntreprise}/contact`}
        note="Plus de 26 agences à votre service dans tout le Cameroun."
      />
    </>
  );
}
