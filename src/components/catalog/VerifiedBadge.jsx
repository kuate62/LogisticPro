import { BadgeCheck } from 'lucide-react';

export default function VerifiedBadge({ size = 'sm', className = '' }) {
  const sizes = { sm: 14, md: 18, lg: 22 };
  return (
    <span className={`cat-verified cat-verified--${size} ${className}`} title="Entreprise vérifiée">
      <BadgeCheck size={sizes[size] || 14} />
      {size !== 'sm' && <span>Vérifiée</span>}
    </span>
  );
}
