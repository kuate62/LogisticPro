export default function LoadingCompanies() {
  return (
    <div className="cat-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="cat-card cat-card--skeleton">
          <div className="cat-card__skel-header">
            <div className="cat-skel cat-skel--circle" />
            <div className="cat-skel__lines">
              <div className="cat-skel cat-skel--text" />
              <div className="cat-skel cat-skel--text cat-skel--short" />
            </div>
          </div>
          <div className="cat-skel cat-skel--text cat-skel--wide" />
          <div className="cat-skel cat-skel--text cat-skel--medium" />
          <div className="cat-card__skel-tags">
            <div className="cat-skel cat-skel--tag" />
            <div className="cat-skel cat-skel--tag" />
          </div>
          <div className="cat-card__skel-meta">
            <div className="cat-skel cat-skel--tag" />
            <div className="cat-skel cat-skel--tag" />
          </div>
          <div className="cat-card__skel-actions">
            <div className="cat-skel cat-skel--btn" />
            <div className="cat-skel cat-skel--btn cat-skel--btn-sm" />
          </div>
        </div>
      ))}
    </div>
  );
}
