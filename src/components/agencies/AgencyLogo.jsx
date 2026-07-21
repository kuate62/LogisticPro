import './AgencyLogo.css';

export function AgencyLogo({ agency, size = 'md' }) {
  const initials = agency?.name
    ? agency.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : 'AG';

  const colors = ['#2563EB', '#16A34A', '#F59E0B', '#DC2626', '#7C3AED', '#0EA5E9'];
  const colorIndex = agency?.name
    ? agency.name.charCodeAt(0) % colors.length
    : 0;

  return (
    <div className={`lp-agency-logo lp-agency-logo--${size}`}>
      {agency?.logo ? (
        <img src={agency.logo} alt={agency.name} className="lp-agency-logo__img" />
      ) : (
        <span
          className="lp-agency-logo__initials"
          style={{ backgroundColor: colors[colorIndex] }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

export default AgencyLogo;
