import CompanyCard from './CompanyCard';

export default function CompanyGrid({ companies }) {
  if (!companies || companies.length === 0) return null;

  return (
    <div className="cat-grid">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}
