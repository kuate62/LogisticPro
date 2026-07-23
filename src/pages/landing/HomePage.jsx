import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import {
  Search, Package, MapPin, CreditCard, BarChart3,
  Truck, Clock, Bell, Shield, Zap, Globe,
  ArrowRight, Eye, Hash, Users,
} from 'lucide-react';
import SectionHeader from '../../components/public/SectionHeader';
import CTABanner from '../../components/public/CTABanner';
import './HomePage.css';

function HeroSection() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      navigate(`/track?number=${encodeURIComponent(trackingNumber.trim())}`);
    }
  };

  return (
    <section className="lp-hero">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="lp-hero__content">
              <span className="lp-hero__badge">Plateforme #1 de logistique au Cameroun</span>
              <h1 className="lp-hero__title">
                La plateforme de logistique de nouvelle génération{' '}
                <span className="lp-hero__highlight">au Cameroun</span>
              </h1>
              <p className="lp-hero__subtitle">
                Suivez vos colis en temps réel, gérez vos agences et optimisez vos opérations
                transport avec une solution tout-en-un.
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
                    { color: '#2563EB', initials: 'PK' },
                    { color: '#7C3AED', initials: 'SN' },
                    { color: '#059669', initials: 'JK' },
                    { color: '#D97706', initials: 'ML' },
                    { color: '#DC2626', initials: 'TO' },
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
                  <strong>+50 entreprises</strong> nous font confiance
                </p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="lp-hero__visual">
              <div className="lp-hero__visual-card lp-hero__visual-card--main">
                <div className="lp-hero__tracking-header">
                  <Truck size={20} style={{ color: 'var(--color-primary)' }} />
                  <span>Expédition #EXP-2026</span>
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
                  <strong>3 nouvelles notifications</strong>
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
    { icon: Package, value: '+12 500', label: 'Colis livrés' },
    { icon: MapPin, value: '26', label: 'Agences' },
    { icon: Globe, value: '45+', label: 'Villes desservies' },
    { icon: Users, value: '+50', label: 'Clients satisfaits' },
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
  const navigate = useNavigate();
  const services = [
    {
      icon: Truck,
      title: 'Suivi en temps réel',
      desc: 'Suivez chaque colis de l\'expédition à la livraison avec des notifications en temps réel.',
    },
    {
      icon: MapPin,
      title: 'Gestion des agences',
      desc: 'Gérez vos agences à travers tout le Cameroun avec des tableaux de bord dédiés.',
    },
    {
      icon: CreditCard,
      title: 'Paiements mobiles',
      desc: 'Orange Money, MTN Mobile Money, espèces — tous les modes de paiement intégrés.',
    },
    {
      icon: BarChart3,
      title: 'Rapports & analytics',
      desc: 'Tableaux de bord et rapports détaillés pour optimiser vos performances.',
    },
  ];

  return (
    <section className="lp-services">
      <Container>
        <SectionHeader
          tag="Services"
          title="Des solutions complètes pour votre logistique"
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
                  onClick={() => navigate('/services')}
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
      icon: Package,
      title: 'Déposez votre colis',
      desc: 'Déposez votre colis dans l\'une de nos agences',
    },
    {
      number: '02',
      icon: Hash,
      title: 'Recevez votre numéro',
      desc: 'Recevez votre numéro de suivi unique',
    },
    {
      number: '03',
      icon: Eye,
      title: 'Suivez en temps réel',
      desc: 'Suivez en temps réel et récupérez votre colis',
    },
  ];

  return (
    <section className="lp-how">
      <Container>
        <SectionHeader
          tag="Processus"
          title="Comment ça marche"
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
    { icon: Clock, title: 'Temps réel', desc: 'Suivi instantané de chaque expédition' },
    { icon: Bell, title: 'Notifications', desc: 'Alertes par SMS et notification push' },
    { icon: MapPin, title: 'Couverture nationale', desc: 'Agences dans les 10 régions' },
    { icon: Shield, title: 'Paiements sécurisés', desc: 'Transactions chiffrées et fiables' },
    { icon: BarChart3, title: 'Historique complet', desc: 'Toutes vos données accessibles' },
    { icon: Zap, title: 'Ultra-rapide', desc: 'Interface réactive et fluide' },
  ];

  return (
    <section className="lp-advantages">
      <Container>
        <SectionHeader
          tag="Avantages"
          title="Pourquoi LogisticPro ?"
          subtitle="Des fonctionnalités pensées pour simplifier votre quotidien logistique"
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
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreviewSection />
      <HowItWorksPreviewSection />
      <WhyUsSection />
      <CTABanner
        title="Prêt à optimiser vos expéditions ?"
        subtitle="Rejoignez les entreprises qui font confiance à LogisticPro"
        primaryLabel="Suivre mon colis"
        primaryTo="/track"
        secondaryLabel="Créer un compte"
        secondaryTo="/register"
        note="Essai gratuit de 14 jours. Aucune carte de crédit requise."
      />
    </>
  );
}
