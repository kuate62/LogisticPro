import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Calculator, ArrowRight, Search, Info } from 'lucide-react';
import PublicBreadcrumb from '../../components/public/PublicBreadcrumb';
import SectionHeader from '../../components/public/SectionHeader';
import FAQAccordion from '../../components/public/FAQAccordion';
import CTABanner from '../../components/public/CTABanner';
import { routes, weightTiers, serviceOptions, extraServices, mockTarifsService } from '../../api/mockTarifs';
import './TarifPage.css';

function EstimateCard() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weightTier, setWeightTier] = useState('');
  const [serviceType, setServiceType] = useState('standard');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cityList = [...new Set(routes.flatMap((r) => [r.origin, r.destination]))].sort();

  const handleEstimate = async (e) => {
    e.preventDefault();
    if (!origin || !destination || !weightTier) { setError('Veuillez remplir tous les champs.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await mockTarifsService.searchTarifs(origin, destination, weightTier, serviceType);
      if (!res) { setError('Aucun tarif trouvé pour ce trajet.'); }
      else { setResult(res); }
    } catch { setError('Erreur lors du calcul.'); }
    setLoading(false);
  };

  const swapCities = () => { setOrigin(destination); setDestination(origin); };

  return (
    <div className="tarif-estimate">
      <div className="tarif-estimate__card">
        <div className="tarif-estimate__header">
          <Calculator size={20} />
          <span>Estimez votre tarif</span>
        </div>
        <form className="tarif-estimate__form" onSubmit={handleEstimate}>
          <Row className="g-3">
            <Col md={5}>
              <label className="tarif-estimate__label">Ville de départ</label>
              <div className="tarif-estimate__select-wrap">
                <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
                  <option value="">Sélectionner</option>
                  {cityList.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </Col>
            <Col md={1} className="tarif-estimate__swap-col">
              <button type="button" className="tarif-estimate__swap" onClick={swapCities} aria-label="Inverser">
                <ArrowRight size={18} />
              </button>
            </Col>
            <Col md={5}>
              <label className="tarif-estimate__label">Ville de destination</label>
              <div className="tarif-estimate__select-wrap">
                <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                  <option value="">Sélectionner</option>
                  {cityList.filter(c => c !== origin).map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </Col>
          </Row>

          <Row className="g-3">
            <Col md={4}>
              <label className="tarif-estimate__label">Poids du colis</label>
              <div className="tarif-estimate__select-wrap">
                <select value={weightTier} onChange={(e) => setWeightTier(e.target.value)}>
                  <option value="">Sélectionner</option>
                  {weightTiers.map((w) => <option key={w.id} value={w.id}>{w.label}</option>)}
                </select>
              </div>
            </Col>
            <Col md={4}>
              <label className="tarif-estimate__label">Type de service</label>
              <div className="tarif-estimate__select-wrap">
                <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                  {serviceOptions.map((s) => <option key={s.id} value={s.id}>{s.label} - {s.delay}</option>)}
                </select>
              </div>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <button type="submit" className="tarif-estimate__btn" disabled={loading}>
                {loading ? 'Calcul...' : <><Search size={16} /> Estimer</>}
              </button>
            </Col>
          </Row>
        </form>

        {error && <p className="tarif-estimate__error">{error}</p>}

        {result && (
          <div className="tarif-estimate__result">
            <div className="tarif-estimate__result-header">
              <h4>Résultat de l'estimation</h4>
              <span className="tarif-estimate__result-route">{result.route.origin} → {result.route.destination}</span>
            </div>
            <div className="tarif-estimate__result-grid">
              <div className="tarif-estimate__result-item">
                <small>Distance</small>
                <strong>{result.route.distance}</strong>
              </div>
              <div className="tarif-estimate__result-item">
                <small>Service</small>
                <strong>{result.serviceType}</strong>
              </div>
              <div className="tarif-estimate__result-item">
                <small>Délai</small>
                <strong>{result.delay}</strong>
              </div>
              <div className="tarif-estimate__result-item tarif-estimate__result-item--total">
                <small>Tarif estimé</small>
                <strong>{result.total}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PricelistTable() {
  const [activeTab, setActiveTab] = useState(0);

  // Grouper les routes par origine
  const groups = routes.reduce((acc, r) => {
    if (!acc[r.origin]) acc[r.origin] = [];
    acc[r.origin].push(r);
    return acc;
  }, {});

  const origins = Object.keys(groups).sort();

  return (
    <div className="tarif-table">
      <div className="tarif-table__tabs">
        {origins.map((origin, i) => (
          <button
            key={origin}
            className={`tarif-table__tab ${i === activeTab ? 'tarif-table__tab--active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {origin}
          </button>
        ))}
      </div>

      <div className="tarif-table__content">
        <table>
          <thead>
            <tr>
              <th>Destination</th>
              <th>Distance</th>
              {weightTiers.map((w) => <th key={w.id}>{w.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {groups[origins[activeTab]]?.map((route) => (
              <tr key={route.id}>
                <td className="tarif-table__dest">{route.destination}</td>
                <td className="tarif-table__dist">{route.distance}</td>
                {weightTiers.map((w) => {
                  const tarif = mockTarifsService.getTarif(route.id, w.id);
                  return (
                    <td key={w.id} className="tarif-table__price">
                      {tarif ? `à partir de ${tarif.toLocaleString('fr-FR')} FCFA` : '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExtraServices() {
  return (
    <div className="tarif-extra">
      <Row className="g-4 justify-content-center">
        {extraServices.map((s) => (
          <Col key={s.id} md={3} sm={6}>
            <div className="tarif-extra__card">
              <h4>{s.label}</h4>
              <p>{s.desc}</p>
              <span className="tarif-extra__price">{s.price.toLocaleString('fr-FR')} FCFA</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

const FAQ_DATA = [
  { q: 'Comment est calculé le tarif ?', a: 'Le tarif est calculé en fonction de la distance entre la ville de départ et la ville de destination, ainsi que du poids du colis. Un supplément peut s\'appliquer pour les services express ou urgents.' },
  { q: 'Y a-t-il des frais supplémentaires ?', a: 'Le tarif affiché inclut le transport de base. Des options payantes sont disponibles : assurance renforcée, emballage professionnel, notifications SMS, livraison à domicile.' },
  { q: 'Puis-je payer à la livraison ?', a: 'Oui, le paiement à la livraison est disponible en espèces, Orange Money ou MTN Mobile Money.' },
  { q: 'Les tarifs sont-ils les mêmes dans toutes les agences ?', a: 'Oui, nos tarifs sont uniformes dans l\'ensemble de notre réseau d\'agences à travers le Cameroun.' },
  { q: 'Proposez-vous des réductions pour les envois en volume ?', a: 'Oui, pour les entreprises et les envois réguliers, nous proposons des tarifs préférentiels. Contactez-nous pour un devis personnalisé.' },
];

export default function TarifPage() {
  const { idEntreprise } = useParams();
  return (
    <>
      <section className="lp-page-hero">
        <Container>
          <PublicBreadcrumb items={[{ label: 'Tarifs' }]} />
          <h1 className="lp-page-hero__title">Nos Tarifs</h1>
          <p className="lp-page-hero__subtitle">
            Des tarifs transparents et compétitifs pour tous vos envois à travers le Cameroun
          </p>
        </Container>
      </section>

      <section className="tarif-section">
        <Container>
          <SectionHeader tag="Estimation" title="Estimez votre tarif" subtitle="Calculez instantanément le coût de votre envoi" />
          <EstimateCard />
        </Container>
      </section>

      <section className="tarif-section tarif-section--alt">
        <Container>
          <SectionHeader tag="Grille" title="Grille tarifaire complète" subtitle="Consultez nos tarifs par trajet et par poids" />
          <div className="tarif-section__note">
            <Info size={14} />
            <span>Les tarifs affichés sont pour le service standard. Comptez 50% supplémentaire pour l'express et 100% pour l'urgent.</span>
          </div>
          <PricelistTable />
        </Container>
      </section>

      <section className="tarif-section">
        <Container>
          <SectionHeader tag="Options" title="Services additionnels" subtitle="Personnalisez votre envoi avec nos options" />
          <ExtraServices />
        </Container>
      </section>

      <section className="tarif-section tarif-section--alt">
        <Container>
          <SectionHeader tag="FAQ" title="Questions sur les tarifs" subtitle="Tout ce que vous devez savoir avant d'envoyer votre colis" />
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <FAQAccordion items={FAQ_DATA} />
          </div>
        </Container>
      </section>

      <CTABanner
        title="Besoin d'un devis personnalisé ?"
        subtitle="Contactez-nous pour un accompagnement sur mesure"
        primaryLabel="Nous contacter"
        primaryTo={`/entreprises/${idEntreprise}/contact`}
        secondaryLabel="Suivre un colis"
        secondaryTo={`/entreprises/${idEntreprise}/suivi`}
      />
    </>
  );
}
