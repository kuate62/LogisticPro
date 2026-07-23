import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_DATA = [
  {
    q: 'Comment trouver mon numéro de suivi ?',
    a: 'Votre numéro de suivi vous est remis lors du dépôt de votre colis à l\'agence. Il commence par SUI- suivi de la date et d\'un numéro.',
  },
  {
    q: 'Mon colis n\'apparaît pas, que faire ?',
    a: 'Vérifiez l\'orthographe du numéro. Si le colis vient d\'être déposé, il peut falloir quelques minutes avant qu\'il n\'apparaisse dans le système.',
  },
  {
    q: 'Le statut n\'a pas changé depuis longtemps ?',
    a: 'Les colis en transit entre deux villes peuvent prendre 2 à 5 jours selon la destination. Si le délai est dépassé, contactez notre support.',
  },
  {
    q: 'Comment récupérer mon colis ?',
    a: 'Rendez-vous dans l\'agence de destination avec une pièce d\'identité valide (CNI ou passeport). Le colis doit être retiré sous 30 jours.',
  },
  {
    q: 'Puis-je modifier la destination ?',
    a: 'Contactez l\'agence d\'origine pour toute modification. Un changement de destination peut entraîner des frais supplémentaires.',
  },
  {
    q: 'Comment contacter le support ?',
    a: 'Appelez le +237 699 123 456 ou écrivez à info@logisticpro.com. Notre équipe est disponible du lundi au samedi, de 7h à 19h.',
  },
];

export default function TrackingFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="tks-faq">
      <div className="tks-faq__header">
        <HelpCircle size={20} />
        <h3>Questions fréquentes</h3>
      </div>
      <div className="tks-faq__list">
        {FAQ_DATA.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className={`tks-faq__item ${isOpen ? 'tks-faq__item--open' : ''}`}>
              <button
                className="tks-faq__question"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                type="button"
              >
                <span>{faq.q}</span>
                <ChevronDown size={16} className={`tks-faq__chevron ${isOpen ? 'tks-faq__chevron--open' : ''}`} />
              </button>
              <div className={`tks-faq__answer ${isOpen ? 'tks-faq__answer--open' : ''}`}>
                <p>{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
