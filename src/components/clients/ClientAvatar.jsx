import { User } from 'lucide-react';

export default function ClientAvatar({ firstName, lastName, photo, size = 40 }) {
  const initials = `${(firstName || '')[0] || ''}${(lastName || '')[0] || ''}`.toUpperCase();
  if (photo) {
    return <img src={photo} alt={`${firstName} ${lastName}`} className="rounded-circle object-fit-cover" style={{ width: size, height: size }} />;
  }
  return (
    <div
      className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-semibold"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials || <User size={size * 0.45} />}
    </div>
  );
}
