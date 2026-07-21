import './AgencySkeleton.css';

export function AgencySkeleton({ count = 5 }) {
  return (
    <div className="lp-agency-skeleton">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="lp-agency-skeleton__row">
          <div className="lp-agency-skeleton__logo" />
          <div className="lp-agency-skeleton__lines">
            <div className="lp-agency-skeleton__line lp-agency-skeleton__line--title" />
            <div className="lp-agency-skeleton__line lp-agency-skeleton__line--subtitle" />
          </div>
          <div className="lp-agency-skeleton__badge" />
        </div>
      ))}
    </div>
  );
}

export default AgencySkeleton;
