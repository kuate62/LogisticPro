import { useState, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Search, HelpCircle, Phone } from 'lucide-react';
import PublicBreadcrumb from '../../components/public/PublicBreadcrumb';
import SectionHeader from '../../components/public/SectionHeader';
import FAQAccordion from '../../components/public/FAQAccordion';
import CTABanner from '../../components/public/CTABanner';
import './FAQPage.css';

const CATEGORIES = [
  { key: 'all', label: 'Toutes' },
  { key: 'expedition', label: 'Expédition' },
  { key: 'paiement', label: 'Paiement' },
  { key: 'suivi', label: 'Suivi' },
  { key: 'retrait', label: 'Retrait' },
  { key: 'compte', label: 'Compte' },
  { key: 'agences', label: 'Agences' },
];

const FAQ_DATA = [
  { category: 'expedition', q: 'Comment préparer mon colis ?', a: 'Utilisez un carton solide adapté à la taille de vos objets. Protégez les éléments fragiles avec du papier bulle. Étiquetez clairement le colis avec le nom et le numéro du destinataire.' },
  { category: 'expedition', q: 'Quels objets puis-je envoyer ?', a: 'Vous pouvez envoyer des documents, vêtements, électronique, alimentation et la plupart des marchandises. Les objets inflammables, dangereux ou illicites sont interdits.' },
  { category: 'expedition', q: 'Quel est le poids maximal par colis ?', a: 'Le poids maximal par colis est de 100 kg. Au-delà, contactez notre service client pour une solution adaptée.' },
  { category: 'paiement', q: 'Quels modes de paiement acceptez-vous ?', a: 'Nous acceptons Orange Money, MTN Mobile Money, espèces et virements bancaires. Le paiement par carte bancaire sera bientôt disponible.' },
  { category: 'paiement', q: 'Puis-je payer à la livraison ?', a: 'Oui, le paiement à la livraison est disponible pour les envois entre grandes villes. Des frais supplémentaires s\'appliquent.' },
  { category: 'paiement', q: 'Comment obtenir une facture ?', a: 'Votre facture est automatiquement générée lors du dépôt. Vous pouvez la télécharger depuis votre espace client ou la demander par email.' },
  { category: 'suivi', q: 'Comment suivre mon colis ?', a: 'Rendez-vous sur la page "Suivre un colis" et saisissez votre numéro de suivi (commençant par SUI-). Vous verrez la position en temps réel de votre envoi.' },
  { category: 'suivi', q: 'Mon numéro de suivi ne fonctionne pas ?', a: 'Vérifiez l\'orthographe du numéro. Si le colis vient d\'être déposé, il peut falloir quelques minutes. En cas de problème persistant, contactez notre support.' },
  { category: 'suivi', q: 'À quelle fréquence les informations sont-elles mises à jour ?', a: 'Les informations de suivi sont mises à jour en temps réel à chaque étape du transport. Vous pouvez suivre votre colis 24h/24, 7j/7.' },
  { category: 'retrait', q: 'Comment récupérer mon colis ?', a: 'Rendez-vous dans l\'agence de destination avec une pièce d\'identité valide (CNI ou passeport). Présentez votre numéro de suivi à l\'agent.' },
  { category: 'retrait', q: 'Combien de temps puis-je laisser mon colis en agence ?', a: 'Votre colis peut être conservé en agence pendant 30 jours. Au-delà, des frais de stockage journaliers s\'appliquent.' },
  { category: 'retrait', q: 'Puis-je déléguer le retrait à un tiers ?', a: 'Oui, la personne mandatée doit présenter sa propre pièce d\'identité ainsi qu\'une autorisation signée du destinataire original.' },
  { category: 'compte', q: 'Comment créer un compte ?', a: 'Rendez-vous sur la page d\'inscription, remplissez vos informations personnelles et votre compte sera activé immédiatement.' },
  { category: 'compte', q: 'J\'ai oublié mon mot de passe ?', a: 'Utilisez la fonctionnalité "Mot de passe oublié" sur la page de connexion. Vous recevrez un lien de réinitialisation par email.' },
  { category: 'agences', q: 'Où se trouvent vos agences ?', a: 'Nous avons 26 agences réparties dans les 10 régions du Cameroun, notamment à Douala, Yaoundé, Bamenda, Garoua, Maroua et Kribi.' },
  { category: 'agences', q: 'Quels sont les horaires d\'ouverture ?', a: 'La plupart de nos agences sont ouvertes du lundi au samedi, de 7h à 19h. Les agences des villes secondaires peuvent avoir des horaires réduits.' },
  { category: 'agences', q: 'Puis-je réserver un créneau de dépôt ?', a: 'Cette fonctionnalité sera bientôt disponible. En attendant, vous pouvez nous appeler pour organiser votre passage.' },
];

const POPULAR = [
  { q: 'Comment suivre mon colis ?', a: 'Utilisez votre numéro SUI-XXX sur la page de suivi pour voir la position en temps réel.' },
  { q: 'Quels modes de paiement acceptez-vous ?', a: 'Orange Money, MTN MoMo, espèces et virements bancaires.' },
  { q: 'Comment récupérer mon colis ?', a: 'Rendez-vous à l\'agence avec votre CNI et votre numéro de suivi.' },
];

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    return FAQ_DATA.filter((f) => {
      const matchCategory = activeCategory === 'all' || f.category === activeCategory;
      const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <>
      <section className="lp-page-hero">
        <Container>
          <PublicBreadcrumb items={[{ label: 'FAQ' }]} />
          <h1 className="lp-page-hero__title">Questions fréquentes</h1>
          <p className="lp-page-hero__subtitle">
            Trouvez rapidement les réponses à vos questions sur nos services
          </p>
        </Container>
      </section>

      <section className="lp-faq-page-search">
        <Container>
          <div className="lp-faq-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setActiveCategory('all'); }}
            />
          </div>
        </Container>
      </section>

      <section className="lp-faq-page-categories">
        <Container>
          <div className="lp-faq-categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={`lp-faq-category ${activeCategory === cat.key ? 'lp-faq-category--active' : ''}`}
                onClick={() => { setActiveCategory(cat.key); setSearch(''); }}
                type="button"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="lp-faq-section">
        <Container>
          <p className="lp-faq-results">{filtered.length} question{filtered.length > 1 ? 's' : ''}</p>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <FAQAccordion items={filtered} />
          </div>
        </Container>
      </section>

      <section className="lp-faq-popular">
        <Container>
          <SectionHeader tag="Populaire" title="Les plus consultées" />
          <div className="lp-faq-popular__grid">
            {POPULAR.map((p) => (
              <div key={p.q} className="lp-faq-popular__card">
                <div className="lp-faq-popular__card-icon">
                  <HelpCircle size={20} />
                </div>
                <h4 className="lp-faq-popular__card-q">{p.q}</h4>
                <p className="lp-faq-popular__card-a">{p.a}</p>
              </div>
            ))}
          </div>
          <div className="lp-faq-contact-card">
            <Phone size={24} />
            <p>Vous n&apos;avez pas trouvé votre réponse ? Contactez-nous au <strong>+237 699 123 456</strong> ou par email à <strong>info@logisticpro.com</strong></p>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Une autre question ?"
        subtitle="Notre équipe est disponible pour vous aider"
        primaryLabel="Nous contacter"
        primaryTo="/contact"
        secondaryLabel="Trouver une agence"
        secondaryTo="/agences"
      />
    </>
  );
}
