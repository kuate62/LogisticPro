import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PublicBreadcrumb({ items = [] }) {
  return (
    <nav className="pp-breadcrumb" aria-label="Fil d'Ariane">
      <Link to="/" className="pp-breadcrumb__item">
        <Home size={14} />
        Accueil
      </Link>
      {items.map((item) => (
        <span key={item.label} className="pp-breadcrumb__separator">
          <ChevronRight size={14} />
          {item.to ? (
            <Link to={item.to} className="pp-breadcrumb__item">{item.label}</Link>
          ) : (
            <span className="pp-breadcrumb__item pp-breadcrumb__item--current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
