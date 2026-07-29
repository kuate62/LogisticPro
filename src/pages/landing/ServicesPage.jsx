import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Package, Truck, MapPin, CreditCard, Clock, ShieldCheck, Weight, ArrowLeftRight, Ship, Plane, Store, Users, CheckCircle } from 'lucide-react';
import PublicBreadcrumb from '../../components/public/PublicBreadcrumb';
import SectionHeader from '../../components/public/SectionHeader';
import FAQAccordion from '../../components/public/FAQAccordion';
import CTABanner from '../../components/public/CTABanner';
import './ServicesPage.css';

const SERVICES = [
  {
    icon: Package,
    title: 'Envoi de colis',
    desc: 'Envoyez vos colis en toute sérénité vers toutes les villes du Cameroun. Prise en charge rapide dans nos agences.',
    advantages: ['Colis standard et volumineux', 'Emballage professionnel', 'Assurance transport incluse'],
  },
  {
    icon: Truck,
    title: 'Livraison express',
    desc: 'Besoin d\'une livraison urgente ? Nos coursiers assurent la livraison en quelques heures dans la même ville.',
    advantages: ['Livraison J+1 en interurbain', 'Coursier dédié', 'SMS de confirmation à chaque étape'],
  },
  {
    icon: MapPin,
    title: 'Transport interurbain',
    desc: 'Reliez les grandes villes du Cameroun grâce à notre réseau de transport quotidien.',
    advantages: ['Douala ↔ Yaoundé quotidien', 'Couverture de 10 régions', 'Départs matin et soir'],
  },
  {
    icon: Weight,
    title: 'Transport de marchandises',
    desc: 'Nous transportons vos marchandises volumineuses et palettes dans tout le pays avec des véhicules adaptés.',
    advantages: ['Camions 5T et 10T disponibles', 'Marchandises palettisées', 'Devis gratuit sous 24h'],
  },
  {
    icon: ArrowLeftRight,
    title: 'Déménagement',
    desc: 'Profitez de notre service de déménagement complet pour particuliers et entreprises.',
    advantages: ['Devis sur place sans engagement', 'Matériel de protection fourni', 'Équipe professionnelle'],
  },
  {
    icon: Store,
    title: 'Courses & commissions',
    desc: 'Faites vos achats sans vous déplacer. Nous retirons et livrons vos commissions en ville.',
    advantages: ['Courses alimentaires', 'Retrait de documents', 'Livraison de repas'],
  },
  {
    icon: Ship,
    title: 'Fret maritime',
    desc: 'Importez et exportez vos marchandises par voie maritime depuis le port de Douala.',
    advantages: ['Conteneurs complets et partagés', 'Dédouanement pris en charge', 'Suivi maritime en temps réel'],
  },
  {
    icon: Plane,
    title: 'Fret aérien',
    desc: 'Pour vos envois urgents à l\'international, notre service fret aérien garantit une livraison rapide.',
    advantages: ['Expédition sous 24h', 'Douane incluse', 'Suivi aérien en temps réel'],
  },
  {
    icon: CreditCard,
    title: 'Paiement à la livraison',
    desc: 'Payez vos colis à la réception. Multiple moyens de paiement acceptés.',
    advantages: ['Paiement comptant à la livraison', 'Orange Money et MTN MoMo', 'Virement bancaire disponible'],
  },
];

const WHY_CHOOSE = [
  { icon: Clock, title: 'Rapide', desc: 'Livraison express en J+1 dans les grandes villes' },
  { icon: ShieldCheck, title: 'Fiable', desc: 'Colis assurés et traçabilité complète' },
  { icon: Users, title: 'Accessible', desc: 'Plus de 26 agences à travers tout le Cameroun' },
];

const FAQ_DATA = [
  { q: 'Quels types de colis puis-je envoyer ?', a: 'Tous types de colis : documents, colis standard, marchandises volumineuses, objets fragiles. Certains articles réglementés peuvent nécessiter des autorisations spéciales.' },
  { q: 'Quels sont les délais de livraison ?', a: 'Express intra-ville : 2-4h. Interurbain : 24-48h. Régions éloignées : 3-5 jours. Le suivi en temps réel vous permet de connaître la position exacte de votre colis.' },
  { q: 'Comment payer mon envoi ?', a: 'Vous pouvez payer en espèces dans nos agences, par Orange Money, MTN Mobile Money ou virement bancaire. Le paiement à la livraison est également disponible.' },
  { q: 'Puis-je suivre mon colis en ligne ?', a: 'Oui ! Chaque colis reçoit un numéro de suivi unique. Vous pouvez le suivre 24h/24 sur notre page de suivi ou via notre plateforme. Des notifications SMS vous informent à chaque étape.' },
  { q: 'Proposez-vous des tarifs pour les entreprises ?', a: 'Oui, nous proposons des tarifs préférentiels pour les entreprises avec envois réguliers. Contactez-nous pour établir un contrat personnalisé.' },
  { q: 'Que faire en cas de colis perdu ?', a: 'Tous nos envois sont assurés. En cas de perte ou de détérioration, contactez notre service client sous 48h pour déclarer le sinistre et être indemnisé.' },
];

export default function ServicesPage() {
  const { idEntreprise } = useParams();
  return (
    <>
      <section className="lp-page-hero">
        <Container>
          <PublicBreadcrumb items={[{ label: 'Services' }]} />
          <h1 className="lp-page-hero__title">Nos Services</h1>
          <p className="lp-page-hero__subtitle">
            Des solutions de transport adaptées à tous vos besoins au Cameroun
          </p>
        </Container>
      </section>

      <section className="lp-services-page">
        <Container>
          <SectionHeader tag="Services" title="Ce que nous vous proposons" subtitle="Du colis express au fret international, nous couvrons tous vos besoins de transport" />
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
          <SectionHeader tag="Pourquoi nous" title="Pourquoi nous choisir" subtitle="Un réseau fiable à travers tout le Cameroun" />
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
          <SectionHeader tag="FAQ" title="Questions sur nos services" subtitle="Tout ce que vous devez savoir avant d'envoyer votre colis" />
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <FAQAccordion items={FAQ_DATA} />
          </div>
        </Container>
      </section>

      <CTABanner
        title="Prêt à envoyer votre colis ?"
        subtitle="Contactez-nous pour un devis gratuit ou rendez-vous dans l'agence la plus proche"
        primaryLabel="Suivre un colis"
        primaryTo={`/entreprises/${idEntreprise}/suivi`}
        secondaryLabel="Nous contacter"
        secondaryTo={`/entreprises/${idEntreprise}/contact`}
      />
    </>
  );
}
