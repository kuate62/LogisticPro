export default function SectionHeader({ tag, title, subtitle }) {
  return (
    <div className="lp-section-header">
      {tag && <span className="lp-section-tag">{tag}</span>}
      <h2 className="lp-section-title">{title}</h2>
      {subtitle && <p className="lp-section-subtitle">{subtitle}</p>}
    </div>
  );
}
