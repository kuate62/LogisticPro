import { AGENCY_STATUS_LABELS, AGENCY_STATUS_COLORS } from '../config/constants';

export function formatAgencyPhone(phone) {
  if (!phone) return '';
  const cleaned = phone.replace(/\s/g, '');
  if (cleaned.startsWith('+243')) {
    const num = cleaned.slice(4);
    return `+243 ${num.slice(0, 2)} ${num.slice(2, 5)} ${num.slice(5)}`;
  }
  return phone;
}

export function formatAgencyAddress(agency) {
  const parts = [agency.address, agency.city, agency.region, agency.country].filter(Boolean);
  return parts.join(', ');
}

export function formatAgencyStatus(status) {
  return AGENCY_STATUS_LABELS[status] || status;
}

export function getAgencyStatusColor(status) {
  return AGENCY_STATUS_COLORS[status] || 'secondary';
}

export function formatAgencyDate(dateStr) {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr));
}

export function formatAgencyCurrency(val) {
  if (val === undefined || val === null) return '—';
  return new Intl.NumberFormat('fr-CD', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(val) + ' FC';
}

export function formatAgencySchedule(schedule) {
  if (!schedule) return [];
  const days = [
    { key: 'monday', label: 'Lundi' },
    { key: 'tuesday', label: 'Mardi' },
    { key: 'wednesday', label: 'Mercredi' },
    { key: 'thursday', label: 'Jeudi' },
    { key: 'friday', label: 'Vendredi' },
    { key: 'saturday', label: 'Samedi' },
    { key: 'sunday', label: 'Dimanche' },
  ];
  return days.map(({ key, label }) => ({
    day: label,
    ...schedule[key],
  }));
}

export function searchAgencies(agencies, query) {
  if (!query) return agencies;
  const q = query.toLowerCase();
  return agencies.filter((a) =>
    a.name.toLowerCase().includes(q) ||
    a.code.toLowerCase().includes(q) ||
    a.city.toLowerCase().includes(q) ||
    a.phone?.includes(q) ||
    a.email?.toLowerCase().includes(q) ||
    a.manager?.name?.toLowerCase().includes(q)
  );
}

export function sortAgencies(agencies, field, direction = 'asc') {
  return [...agencies].sort((a, b) => {
    let valA = a[field];
    let valB = b[field];
    if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = (valB || '').toLowerCase();
    }
    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

export function filterAgencies(agencies, filters) {
  let result = [...agencies];
  if (filters.status) {
    result = result.filter((a) => a.status === filters.status);
  }
  if (filters.city) {
    result = result.filter((a) => a.city === filters.city);
  }
  if (filters.region) {
    result = result.filter((a) => a.region === filters.region);
  }
  if (filters.isPrimary !== undefined && filters.isPrimary !== null) {
    result = result.filter((a) => a.isPrimary === filters.isPrimary);
  }
  if (filters.manager) {
    const q = filters.manager.toLowerCase();
    result = result.filter((a) => a.manager?.name?.toLowerCase().includes(q));
  }
  return result;
}

export function paginateAgencies(agencies, page = 1, perPage = 10) {
  const total = agencies.length;
  const totalPages = Math.ceil(total / perPage);
  const offset = (page - 1) * perPage;
  const data = agencies.slice(offset, offset + perPage);
  return { data, total, page, perPage, totalPages };
}
