export default function Avatar({ firstName, lastName, size = 40 }) {
  const initials = `${(firstName || '')[0] || ''}${(lastName || '')[0] || ''}`.toUpperCase();
  return (
    <div
      className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-semibold"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}
