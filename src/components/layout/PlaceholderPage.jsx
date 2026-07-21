export default function PlaceholderPage({ title }) {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>{title}</h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>Page en développement</p>
    </div>
  );
}
