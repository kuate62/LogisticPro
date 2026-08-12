import { resolveFileUrl } from '../../utils/fileUrl';

export default function Avatar({ firstName, lastName, size = 40, src = null }) {
  const initials = `${(firstName || '')[0] || ''}${(lastName || '')[0] || ''}`.toUpperCase();
  const imageUrl = resolveFileUrl(src);

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={`${firstName || ''} ${lastName || ''}`}
        className="rounded-circle object-fit-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-semibold"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}
