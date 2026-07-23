import { Container, Row, Col } from 'react-bootstrap';
import { Truck, MapPin, CreditCard, BarChart3, Package, Globe, Shield, Clock, Users, CheckCircle } from 'lucide-react';
import PublicBreadcrumb from '../../components/public/PublicBreadcrumb';
import SectionHeader from '../../components/public/SectionHeader';
import FAQAccordion from '../../components/public/FAQAccordion';
import CTABanner from '../../components/public/CTABanner';
import './ServicesPage.css';

const SERVICES = [
  {
    icon: Truck,
    title: 'Suivi de colis en temps réel',
    desc: 'Suivez chaque colis de l\'expédition à la livraison avec des notifications instantanées.',
    advantages: ['Position en temps réel', 'Notifications automatiques par SMS', 'Historique complet des mouvements'],
  },
  {
    icon: MapPin,
    title: 'Gestion des agences',
    desc: 'Centralisez la gestion de toutes vos agences avec des outils de pilotage performants.',
    advantages: ['Tableau de bord unifié', 'Indicateurs de performance', 'Gestion multi-agences'],
  },
  {
    icon: CreditCard,
    title: 'Paiements mobiles',
    desc: 'Intégrez tous les modes de paiement populaires au Cameroun pour plus de commodité.',
    advantages: ['Orange Money & MTN MoMo', 'Espèces et virements', 'Transactions sécurisées'],
  },
  {
    icon: BarChart3,
    title: 'Rapports & Analytics',
    desc: 'Générez des rapports détaillés pour piloter vos performances et optimiser vos coûts.',
    advantages: ['Tableaux de bord interactifs', 'Export PDF et Excel', 'KPIs personnalisables'],
  },
  {
    icon: Package,
    title: 'Gestion des expéditions',
    desc: 'Créez, gérez et suivez toutes vos expéditions depuis une interface centralisée.',
    advantages: ['Création rapide en 3 clics', 'Affectation automatique aux trajets', 'Gestion des incidents'],
  },
  {
    icon: Globe,
    title: 'Réseau national',
    desc: 'Bénéficiez d\'un réseau couvrant l\'ensemble du territoire camerounais.',
    advantages: ['26 agences actives', 'Couverture des 10 régions', 'Trajets interurbains quotidiens'],
  },
];

const WHY_CHOOSE = [
  { icon: Shield, title: 'Fiable', desc: '99.9% de disponibilité et support réactif' },
  { icon: Clock, title: 'Rapide', desc: 'Interface optimisée pour des actions en un clic' },
  { icon: Users, title: 'Accessible', desc: 'Disponible 24/7 sur tous vos appareils' },
];

const FAQ_DATA = [
  { q: 'Quels types de colis pouvez-vous transporter ?', a: 'Nous transportons tous types de colis : documents, colis standard, marchandises volumineuses et objets fragiles. Certaines catégories peuvent nécessiter un emballage renforcé.' },
  { q: 'Quel est le délai moyen de livraison ?', a: 'Les délais varient selon la destination : 1-2 jours pour les grandes villes, 3-5 jours pour les zones éloignées. Vous suivez tout en temps réel.' },
  { q: 'Proposez-vous des tarifs entreprise ?', a: 'Oui, nous offrons des tarifs préférentiels pour les entreprises avec un volume régulier. Contactez-nous pour un devis personnalisé.' },
  { q: 'Comment signaler un problème avec mon envoi ?', a: 'Vous pouvez nous contacter via la page Contact ou appeler notre hotline. Nous traitons chaque signalement sous 24h.' },
];

export default function ServicesPage() {
  return (
    <>
      <section className="lp-page-hero">
        <Container>
          <PublicBreadcrumb items={[{ label: 'Services' }]} />
          <h1 className="lp-page-hero__title">Nos Services</h1>
          <p className="lp-page-hero__subtitle">
            Des solutions complètes pour simplifier vos opérations logistiques au Cameroun
          </p>
        </Container>
      </section>

      <section className="lp-services-page">
        <Container>
          <SectionHeader tag="Solutions" title="Tout ce dont vous avez besoin" subtitle="Des outils puissants conçus pour les entreprises de transport au Cameroun" />
          <Row className="g-4">
            {SERVICES.map((s) => (
              <Col key={s.title} md={6} lg={4}>
                <div className="lp-service-detail-card">
                  <div className="lp-service-detail-card__icon">
                    <s.icon size={28} />
                  </div>
                  <h3 className="lp-service-detail-card__title">{s.title}</h3>
                  <p className="lp-service-detail-card__desc">{s.desc}</p>
                  <ul className="lp-service-detail-card__list">
                    {s.advantages.map((adv) => (
                      <li key={adv}><CheckCircle size={14} /> {adv}</li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="lp-why-services">
        <Container>
          <SectionHeader tag="Pourquoi nous" title="Pourquoi choisir nos services" subtitle="Une plateforme pensée pour votre réussite" />
          <Row className="g-4 justify-content-center">
            {WHY_CHOOSE.map((w) => (
              <Col key={w.title} md={4}>
                <div className="lp-why-services__card">
                  <div className="lp-why-services__icon">
                    <w.icon size={24} />
                  </div>
                  <h3 className="lp-why-services__title">{w.title}</h3>
                  <p className="lp-why-services__desc">{w.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="lp-services-faq">
        <Container>
          <SectionHeader tag="FAQ Services" title="Questions sur nos services" />
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <FAQAccordion items={FAQ_DATA} />
          </div>
        </Container>
      </section>

      <CTABanner
        title="Découvrez nos services en détail"
        subtitle="Parlez à un de nos experts pour trouver la solution idéale"
        primaryLabel="Nous contacter"
        primaryTo="/contact"
        secondaryLabel="Retour à l'accueil"
        secondaryTo="/"
      />
    </>
  );
}
