export default function CompanyResultCounter({ total }) {
  return (
    <p className="cat-result-counter">
      <strong>{total}</strong> entreprise{total > 1 ? 's' : ''} trouvée{total > 1 ? 's' : ''}
    </p>
  );
}
