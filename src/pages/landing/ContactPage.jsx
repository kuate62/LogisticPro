import { Container, Row, Col } from 'react-bootstrap';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import PublicBreadcrumb from '../../components/public/PublicBreadcrumb';
import ContactForm from '../../components/public/ContactForm';
import CTABanner from '../../components/public/CTABanner';
import './ContactPage.css';

const INFOS = [
  { icon: Phone, label: 'Téléphone', value: '+237 699 123 456', href: 'tel:+237699123456' },
  { icon: Mail, label: 'Email', value: 'info@logisticpro.com', href: 'mailto:info@logisticpro.com' },
  { icon: MapPin, label: 'Adresse', value: 'Douala, Cameroun', href: null },
  { icon: Clock, label: 'Horaires', value: 'Lun-Sam: 7h - 19h', href: null },
];

export default function ContactPage() {
  return (
    <>
      <section className="lp-page-hero">
        <Container>
          <PublicBreadcrumb items={[{ label: 'Contact' }]} />
          <h1 className="lp-page-hero__title">Contactez-nous</h1>
          <p className="lp-page-hero__subtitle">
            Notre équipe est disponible du lundi au samedi pour répondre à toutes vos questions
          </p>
        </Container>
      </section>

      <section className="lp-contact-page-form">
        <Container>
          <Row className="g-4 align-items-start">
            <Col lg={5}>
              <div className="lp-contact-info">
                {INFOS.map((info) => (
                  <div key={info.label} className="lp-contact-info__card">
                    <div className="lp-contact-info__icon">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <div className="lp-contact-info__label">{info.label}</div>
                      {info.href ? (
                        <div className="lp-contact-info__value">
                          <a href={info.href}>{info.value}</a>
                        </div>
                      ) : (
                        <div className="lp-contact-info__value">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            <Col lg={7}>
              <div className="lp-contact-form-wrapper">
                <h3>Envoyez-nous un message</h3>
                <ContactForm />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="lp-map-section">
        <Container>
          <div className="lp-contact-map">
            <MapPin size={48} style={{ opacity: 0.4 }} />
            <span className="lp-contact-map__text">Carte interactive à venir</span>
            <small style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
              Localisation de nos bureaux
            </small>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Besoin d'aide immédiate ?"
        subtitle="Appelez-nous directement ou visitez l'agence la plus proche"
        primaryLabel="Trouver une agence"
        primaryTo="/agences"
        secondaryLabel="Suivre un colis"
        secondaryTo="/track"
      />
    </>
  );
}
