import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Search, MapPin, Phone, Clock, Navigation } from 'lucide-react';
import PublicBreadcrumb from '../../components/public/PublicBreadcrumb';
import CTABanner from '../../components/public/CTABanner';
import './AgenciesPage.css';

const AGENCIES = [
  { id: 1, name: 'Agence Centrale Douala', city: 'Douala', address: 'Boulevard de la République, Douala', phone: '+237 699 123 456', hours: 'Lun-Sam: 7h-19h', services: ['Envoi', 'Retrait', 'Emballage', 'Assurance'] },
  { id: 2, name: 'Agence Yaoundé Centre', city: 'Yaoundé', address: 'Avenue Kennedy, Yaoundé', phone: '+237 699 234 567', hours: 'Lun-Sam: 7h-19h', services: ['Envoi', 'Retrait', 'Emballage'] },
  { id: 3, name: 'Agence Bamenda', city: 'Bamenda', address: 'Commercial Avenue, Bamenda', phone: '+237 699 345 678', hours: 'Lun-Sam: 8h-18h', services: ['Envoi', 'Retrait'] },
  { id: 4, name: 'Agence Garoua', city: 'Garoua', address: 'Route de Maroua, Garoua', phone: '+237 699 456 789', hours: 'Lun-Ven: 8h-17h', services: ['Envoi', 'Retrait', 'Emballage'] },
  { id: 5, name: 'Agence Maroua', city: 'Maroua', address: 'Avenue Félix Éboué, Maroua', phone: '+237 699 567 890', hours: 'Lun-Ven: 8h-17h', services: ['Envoi', 'Retrait'] },
  { id: 6, name: 'Agence Kribi', city: 'Kribi', address: 'Route du Port, Kribi', phone: '+237 699 678 901', hours: 'Lun-Sam: 7h-18h', services: ['Envoi', 'Retrait', 'Emballage', 'Assurance'] },
];

const CITIES = ['Toutes', 'Douala', 'Yaoundé', 'Bamenda', 'Garoua', 'Maroua', 'Kribi'];

export default function AgenciesPage() {
  const [search, setSearch] = useState('');
  const [activeCity, setActiveCity] = useState('Toutes');

  const filtered = AGENCIES.filter((a) => {
    const matchCity = activeCity === 'Toutes' || a.city === activeCity;
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.city.toLowerCase().includes(search.toLowerCase());
    return matchCity && matchSearch;
  });

  return (
    <>
      <section className="lp-page-hero">
        <Container>
          <PublicBreadcrumb items={[{ label: 'Agences' }]} />
          <h1 className="lp-page-hero__title">Trouver une agence</h1>
          <p className="lp-page-hero__subtitle">
            Retrouvez l&apos;agence la plus proche de chez vous parmi notre réseau national
          </p>
        </Container>
      </section>

      <section className="lp-agencies-page">
        <Container>
          <div className="lp-agencies-search">
            <div className="lp-agencies-search__input">
              <Search size={18} />
              <input
                type="text"
                placeholder="Rechercher par nom ou ville..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="lp-agencies-filters">
            {CITIES.map((city) => (
              <button
                key={city}
                className={`lp-agencies-filter ${activeCity === city ? 'lp-agencies-filter--active' : ''}`}
                onClick={() => setActiveCity(city)}
                type="button"
              >
                {city}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="lp-agencies-grid">
        <Container>
          <Row className="g-4">
            {filtered.map((agency) => (
              <Col key={agency.id} md={6} lg={4}>
                <div className="lp-agency-card">
                  <div className="lp-agency-card__header">
                    <span className="lp-agency-card__dot" />
                    <h3 className="lp-agency-card__name">{agency.name}</h3>
                  </div>
                  <div className="lp-agency-card__info">
                    <div className="lp-agency-card__info-item">
                      <MapPin size={14} />
                      <span>{agency.address}</span>
                    </div>
                    <div className="lp-agency-card__info-item">
                      <Phone size={14} />
                      <span>{agency.phone}</span>
                    </div>
                    <div className="lp-agency-card__info-item">
                      <Clock size={14} />
                      <span>{agency.hours}</span>
                    </div>
                  </div>
                  <div className="lp-agency-card__services">
                    {agency.services.map((s) => (
                      <span key={s} className="lp-agency-card__service-badge">{s}</span>
                    ))}
                  </div>
                  <button className="lp-agency-card__map-btn" type="button">
                    <Navigation size={14} />
                    Voir sur la carte
                  </button>
                </div>
              </Col>
            ))}
          </Row>
          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '48px 0' }}>
              Aucune agence trouvée pour cette recherche.
            </p>
          )}
        </Container>
      </section>

      <section className="lp-map-section">
        <Container>
          <div className="lp-map-placeholder">
            <MapPin size={48} style={{ opacity: 0.4 }} />
            <span className="lp-map-placeholder__text">Carte interactive à venir</span>
            <small style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
              Visualisation de nos 26 agences
            </small>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Besoin d'une agence ?"
        subtitle="Notre réseau couvre l'ensemble du territoire camerounais"
        primaryLabel="Nous contacter"
        primaryTo="/contact"
        secondaryLabel="Comment envoyer"
        secondaryTo="/comment-envoyer"
      />
    </>
  );
}
