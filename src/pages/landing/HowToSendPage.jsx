import { Container, Row, Col } from 'react-bootstrap';
import {
  Package, CreditCard, Truck, Navigation, MapPin, PackageCheck,
  CheckCircle, Lightbulb, XCircle, Shield,
} from 'lucide-react';
import PublicBreadcrumb from '../../components/public/PublicBreadcrumb';
import SectionHeader from '../../components/public/SectionHeader';
import CTABanner from '../../components/public/CTABanner';
import './HowToSendPage.css';

const STEPS = [
  { number: 1, icon: Package, title: 'Préparez votre colis', desc: 'Emballage solide, colis bien protégé. Étiquetez avec le nom du destinataire.', tips: ['Utilisez un carton adapté à la taille', 'Protégez les objets fragiles avec du papier bulle'] },
  { number: 2, icon: MapPin, title: 'Déposez à l\'agence', desc: 'Rendez-vous dans l\'agence la plus proche avec votre colis et une pièce d\'identité.', tips: ['Vérifiez les horaires d\'ouverture', 'Apportez votre CNI ou passeport'] },
  { number: 3, icon: CreditCard, title: 'Paiement', desc: 'Réglez les frais de transport par le mode de votre choix.', tips: ['Orange Money, MTN MoMo, espèces acceptés', 'Demandez toujours votre reçu'] },
  { number: 4, icon: Truck, title: 'Transport', desc: 'Votre colis est pris en charge et acheminé vers sa destination.', tips: ['Suivez en temps réel via votre numéro', 'Durée : 1 à 5 jours selon la destination'] },
  { number: 5, icon: Navigation, title: 'Suivi en temps réel', desc: 'Consultez la position de votre colis à tout moment.', tips: ['Utilisez le numéro SUI-XXX', 'Recevez des notifications automatiques'] },
  { number: 6, icon: PackageCheck, title: 'Retrait du colis', desc: 'Le destinataire récupère le colis à l\'agence de destination.', tips: ['Retrait possible sous 30 jours', 'Pièce d\'identité obligatoire'] },
];

const PRACTICES = [
  { icon: Shield, title: 'Emballage sécurisé', desc: 'Utilisez un carton robuste et protégez vos objets fragiles avec du papier bulle ou des mousses.' },
  { icon: CheckCircle, title: 'Étiquetage clair', desc: 'Inscrivez lisiblement le nom et téléphone du destinataire sur le colis.' },
  { icon: Package, title: 'Assurance recommandée', desc: 'Pour les objets de valeur, souscrivez à notre option d\'assurance transport.' },
];

const PROHIBITED = [
  'Substances inflammables ou explosives',
  'Produits chimiques dangereux',
  'Armes et munitions',
  'Drogues et stupéfiants',
  'Animaux vivants',
  'Documents d\'identité officiels',
];

export default function HowToSendPage() {
  return (
    <>
      <section className="lp-page-hero">
        <Container>
          <PublicBreadcrumb items={[{ label: 'Comment envoyer' }]} />
          <h1 className="lp-page-hero__title">Comment envoyer un colis</h1>
          <p className="lp-page-hero__subtitle">
            Un processus simple en 6 étapes pour expédier votre colis partout au Cameroun
          </p>
        </Container>
      </section>

      <section className="lp-send-steps-section">
        <Container>
          <SectionHeader tag="Processus" title="Les 6 étapes de votre envoi" subtitle="De la préparation du colis au retrait par le destinataire" />
          <div className="lp-send-steps">
            {STEPS.map((step, i) => (
              <div className="lp-send-step" key={step.number}>
                <div className="lp-send-step__connector">
                  <div className="lp-send-step__number">{step.number}</div>
                  {i < STEPS.length - 1 && <div className="lp-send-step__line" />}
                </div>
                <div className="lp-send-step__card">
                  <div className="lp-send-step__icon"><step.icon size={24} /></div>
                  <h3 className="lp-send-step__title">{step.title}</h3>
                  <p className="lp-send-step__desc">{step.desc}</p>
                  <ul className="lp-send-step__tips">
                    {step.tips.map((tip) => (
                      <li key={tip}><Lightbulb size={12} /> {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="lp-send-practices">
        <Container>
          <SectionHeader tag="Recommandations" title="Bonnes pratiques" subtitle="Conseils pour un envoi réussi" />
          <Row className="g-4 justify-content-center">
            {PRACTICES.map((p) => (
              <Col key={p.title} md={4}>
                <div className="lp-send-practice-card">
                  <div className="lp-send-practice-card__icon">
                    <p.icon size={24} />
                  </div>
                  <h3 className="lp-send-practice-card__title">{p.title}</h3>
                  <p className="lp-send-practice-card__desc">{p.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="lp-send-prohibited">
        <Container>
          <SectionHeader tag="Important" title="Objets interdits" subtitle="Ces objets ne peuvent pas être transportés" />
          <div className="lp-send-prohibited__card">
            <div className="lp-send-prohibited__header">
              <XCircle size={20} />
              Liste des objets interdits
            </div>
            <div className="lp-send-prohibited__list">
              {PROHIBITED.map((item) => (
                <div key={item} className="lp-send-prohibited__item">
                  <XCircle size={16} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Envoyez votre premier colis"
        subtitle="Rejoignez les milliers de clients qui nous font confiance"
        primaryLabel="Trouver une agence"
        primaryTo="/agences"
        secondaryLabel="Suivre un colis"
        secondaryTo="/track"
      />
    </>
  );
}
