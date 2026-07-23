import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="lp-faq__list">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={`lp-faq__item ${isOpen ? 'lp-faq__item--open' : ''}`}>
            <button
              className="lp-faq__question"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              type="button"
            >
              <span>{faq.q}</span>
              <ChevronDown size={18} className={`lp-faq__chevron ${isOpen ? 'lp-faq__chevron--open' : ''}`} />
            </button>
            <div className={`lp-faq__answer ${isOpen ? 'lp-faq__answer--open' : ''}`}>
              <p>{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
