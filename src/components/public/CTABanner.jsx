import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTABanner({ title, subtitle, primaryLabel, primaryTo, secondaryLabel, secondaryTo, note }) {
  const navigate = useNavigate();
  return (
    <section className="lp-cta">
      <div className="lp-cta__inner">
        <h2 className="lp-cta__title">{title}</h2>
        <p className="lp-cta__subtitle">{subtitle}</p>
        <div className="lp-cta__actions">
          <button type="button" className="lp-cta__btn lp-cta__btn--primary" onClick={() => navigate(primaryTo)}>
            {primaryLabel}
            <ArrowRight size={16} />
          </button>
          {secondaryLabel && (
            <button type="button" className="lp-cta__btn lp-cta__btn--outline" onClick={() => navigate(secondaryTo)}>
              {secondaryLabel}
            </button>
          )}
        </div>
        {note && <p className="lp-cta__note">{note}</p>}
      </div>
    </section>
  );
}
