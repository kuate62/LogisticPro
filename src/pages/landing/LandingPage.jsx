import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import {
  Search, Package, MapPin, CreditCard, Users, BarChart3,
  Truck, Clock, Bell, Shield, Zap, Globe, CheckCircle,
  ArrowRight, Eye, Hash, Star, ChevronDown, Phone, Mail,
} from 'lucide-react';
import './LandingPage.css';

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
                Suivez vos colis partout en{' '}
                <span className="lp-hero__highlight">République du Cameroun</span>
              </h1>
              <p className="lp-hero__subtitle">
                La solution complète pour les entreprises de transport. Suivi en temps réel,
                gestion des agences et paiements mobiles intégrés.
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

function ServicesSection() {
  const services = [
    {
      icon: Truck,
      title: 'Suivi de colis',
      desc: 'Suivez chaque colis en temps réel, de l\'expédition à la livraison avec des notifications instantanées.',
    },
    {
      icon: MapPin,
      title: 'Gestion des agences',
      desc: 'Gérez vos agences à travers le Cameroun avec des tableaux de bord et statistiques dédiés.',
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
    <section className="lp-services" id="services">
      <Container>
        <div className="lp-section-header">
          <span className="lp-section-tag">Services</span>
          <h2 className="lp-section-title">Des solutions adaptées à vos besoins</h2>
          <p className="lp-section-subtitle">
            Tout ce dont vous avez besoin pour gérer vos opérations logistiques en toute sérénité.
          </p>
        </div>
        <Row className="g-4">
          {services.map((s) => (
            <Col key={s.title} md={6} lg={3}>
              <div className="lp-service-card">
                <div className="lp-service-card__icon">
                  <s.icon size={24} />
                </div>
                <h3 className="lp-service-card__title">{s.title}</h3>
                <p className="lp-service-card__desc">{s.desc}</p>
                <a href="#services" className="lp-service-card__link">
                  En savoir plus <ArrowRight size={14} />
                </a>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: Package,
      title: 'Déposez votre colis',
      desc: 'Enregistrez votre colis dans l\'une de nos agences',
    },
    {
      number: '02',
      icon: Hash,
      title: 'Recevez votre numéro',
      desc: 'Un code de suivi unique vous est attribué',
    },
    {
      number: '03',
      icon: Eye,
      title: 'Suivez en temps réel',
      desc: 'Consultez la position de votre colis à tout moment',
    },
    {
      number: '04',
      icon: CheckCircle,
      title: 'Récupérez votre colis',
      desc: 'Retirez votre colis dans l\'agence de destination',
    },
  ];

  return (
    <section className="lp-how" id="how-it-works">
      <Container>
        <div className="lp-section-header">
          <span className="lp-section-tag">Processus</span>
          <h2 className="lp-section-title">Comment ça fonctionne</h2>
          <p className="lp-section-subtitle">
            Un processus simple en quatre étapes pour suivre vos expéditions
          </p>
        </div>
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

function AdvantagesSection() {
  const advantages = [
    { icon: Clock, title: 'Temps réel', desc: 'Suivi instantané de chaque expédition' },
    { icon: Bell, title: 'Notifications', desc: 'Alertes par SMS et notification push' },
    { icon: MapPin, title: 'Couverture nationale', desc: 'Agences dans les 10 régions' },
    { icon: Shield, title: 'Paiements sécurisés', desc: 'Transactions chiffrées et fiables' },
    { icon: BarChart3, title: 'Historique', desc: 'Toutes vos données accessibles' },
    { icon: Zap, title: 'Rapidité', desc: 'Interface ultra-réactive et fluide' },
  ];

  return (
    <section className="lp-advantages">
      <Container>
        <div className="lp-section-header">
          <span className="lp-section-tag">Avantages</span>
          <h2 className="lp-section-title">Pourquoi LogisticPro ?</h2>
          <p className="lp-section-subtitle">
            Des fonctionnalités pensées pour simplifier votre quotidien logistique
          </p>
        </div>
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

function CoverageSection() {
  const cities = [
    'Douala', 'Yaoundé', 'Bamenda', 'Maroua',
    'Bafoussam', 'Kribi', 'Garoua', 'Limbé',
  ];

  return (
    <section className="lp-coverage" id="agences">
      <Container>
        <div className="lp-section-header">
          <span className="lp-section-tag">Couverture</span>
          <h2 className="lp-section-title">Des agences partout au Cameroun</h2>
          <p className="lp-section-subtitle">
            Un réseau étendu pour couvrir l'ensemble du territoire camerounais
          </p>
        </div>
        <Row className="g-4 align-items-start">
          <Col lg={6}>
            <div className="lp-coverage__cities">
              {cities.map((city) => (
                <div key={city} className="lp-coverage__city">
                  <span className="lp-coverage__city-name">{city}</span>
                  <span className="lp-coverage__city-dot" title="Agence active" />
                </div>
              ))}
            </div>
          </Col>
          <Col lg={6}>
            <div className="lp-coverage__map">
              <MapPin size={48} style={{ opacity: 0.4 }} />
              <span className="lp-coverage__map-text">Carte interactive</span>
              <small style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                Visualisation de nos 26 agences
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Patrick Kamga',
      role: 'Directeur, Camer Transport SARL',
      text: 'LogisticPro a transformé notre gestion. -80% de pertes de colis en 3 mois.',
      initials: 'PK',
      color: '#2563EB',
    },
    {
      name: 'Sarah Ndjock',
      role: 'Resp. logistique, Express Cameroun SARL',
      text: 'Le suivi en temps réel nous fait gagner un temps précieux. Je recommande.',
      initials: 'SN',
      color: '#7C3AED',
    },
    {
      name: 'Jean Kotto',
      role: 'Gérant, Env Express',
      text: 'Le paiement mobile intégré est une avancée majeure pour nos opérations.',
      initials: 'JK',
      color: '#059669',
    },
  ];

  return (
    <section className="lp-testimonials">
      <Container>
        <div className="lp-section-header">
          <span className="lp-section-tag">Témoignages</span>
          <h2 className="lp-section-title">Ils nous font confiance</h2>
        </div>
        <Row className="g-4">
          {testimonials.map((t) => (
            <Col key={t.name} md={4}>
              <div className="lp-testimonial-card">
                <div className="lp-testimonial-card__stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p className="lp-testimonial-card__text">"{t.text}"</p>
                <div className="lp-testimonial-card__author">
                  <div
                    className="lp-testimonial-card__avatar"
                    style={{ backgroundColor: `${t.color}15`, color: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div className="lp-testimonial-card__author-info">
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: 'Comment suivre mon colis ?',
      a: 'Entrez votre numéro de suivi dans la barre de recherche ou dans la page de suivi. Vous verrez la position en temps réel de votre colis.',
    },
    {
      q: 'Quels modes de paiement acceptez-vous ?',
      a: 'Nous acceptons Orange Money, MTN Mobile Money, espèces et virements bancaires.',
    },
    {
      q: 'Comment créer un compte ?',
      a: 'Rendez-vous sur la page d\'inscription, remplissez vos informations et votre compte sera activé immédiatement.',
    },
    {
      q: 'Combien d\'agences avez-vous ?',
      a: 'Nous comptons 26 agences réparties dans les 10 régions du Cameroun.',
    },
    {
      q: 'Le service est-il disponible 24/7 ?',
      a: 'Oui, la plateforme est accessible 24h/24, 7j/7 depuis n\'importe quel appareil connecté à internet.',
    },
    {
      q: 'Comment contacter le support ?',
      a: 'Vous pouvez nous joindre par email, téléphone ou via le formulaire de contact. Notre équipe répond sous 24h.',
    },
  ];

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="lp-faq" id="faq">
      <Container>
        <div className="lp-section-header">
          <span className="lp-section-tag">FAQ</span>
          <h2 className="lp-section-title">Questions fréquentes</h2>
        </div>
        <div className="lp-faq__search">
          <Search size={18} className="lp-faq__search-icon" />
          <input
            type="text"
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndex(null);
            }}
          />
        </div>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {filtered.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`lp-faq__item ${isOpen ? 'lp-faq__item--open' : ''}`}>
                <button
                  className="lp-faq__question"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`lp-faq__chevron ${isOpen ? 'lp-faq__chevron--open' : ''}`}
                  />
                </button>
                <div className={`lp-faq__answer ${isOpen ? 'lp-faq__answer--open' : ''}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '32px 0', fontSize: 14 }}>
              Aucun résultat trouvé pour "{searchQuery}"
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

function ContactSection() {
  const infos = [
    { icon: MapPin, label: 'Adresse', value: 'Douala, Cameroun' },
    { icon: Phone, label: 'Téléphone', value: '+237 699 123 456' },
    { icon: Mail, label: 'Email', value: 'info@logisticpro.com' },
  ];

  return (
    <section className="lp-contact" id="contact">
      <Container>
        <div className="lp-section-header">
          <span className="lp-section-tag">Contact</span>
          <h2 className="lp-section-title">Restons en contact</h2>
          <p className="lp-section-subtitle">
            Notre équipe est disponible pour répondre à toutes vos questions
          </p>
        </div>
        <Row className="g-4">
          <Col lg={5}>
            {infos.map((info) => (
              <div key={info.label} className="lp-contact__info-card">
                <div className="lp-contact__info-icon">
                  <info.icon size={20} />
                </div>
                <div>
                  <div className="lp-contact__info-label">{info.label}</div>
                  <div className="lp-contact__info-value">{info.value}</div>
                </div>
              </div>
            ))}
          </Col>
          <Col lg={7}>
            <div className="lp-contact__form">
              <div className="lp-contact__form-group">
                <label htmlFor="contact-name">Nom</label>
                <input type="text" id="contact-name" placeholder="Votre nom complet" />
              </div>
              <div className="lp-contact__form-group">
                <label htmlFor="contact-email">Email</label>
                <input type="email" id="contact-email" placeholder="votre@email.com" />
              </div>
              <div className="lp-contact__form-group">
                <label htmlFor="contact-subject">Sujet</label>
                <input type="text" id="contact-subject" placeholder="Objet de votre message" />
              </div>
              <div className="lp-contact__form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" placeholder="Décrivez votre demande..." />
              </div>
              <button type="button" className="lp-contact__form-submit">
                Envoyer le message
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="lp-cta">
      <Container>
        <div className="lp-cta__inner">
          <h2 className="lp-cta__title">Prêt à optimiser vos expéditions ?</h2>
          <p className="lp-cta__subtitle">
            Rejoignez les entreprises qui font confiance à LogisticPro
          </p>
          <div className="lp-cta__actions">
            <button
              type="button"
              className="lp-cta__btn lp-cta__btn--primary"
              onClick={() => navigate('/track')}
            >
              Suivre mon colis
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              className="lp-cta__btn lp-cta__btn--outline"
              onClick={() => navigate('/register')}
            >
              Créer un compte
            </button>
          </div>
          <p className="lp-cta__note">
            Essai gratuit de 14 jours. Aucune carte de crédit requise.
          </p>
        </div>
      </Container>
    </section>
  );
}

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <HowItWorksSection />
      <AdvantagesSection />
      <CoverageSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <CTASection />
    </>
  );
}

export default LandingPage;
