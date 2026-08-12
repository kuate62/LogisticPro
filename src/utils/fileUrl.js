const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');

export function resolveFileUrl(path) {
  if (!path) return null;
  if (/^(https?:)?\/\//.test(path)) return path;
  if (path.startsWith('/uploads/')) return API_BASE.replace(/\/api$/, '') + path;
  return path;
}
