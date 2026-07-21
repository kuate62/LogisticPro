import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

export default function SortIcon({ field, currentSort }) {
  if (currentSort.field !== field) return <ChevronsUpDown size={14} className="text-muted ms-1" />;
  return currentSort.direction === 'asc'
    ? <ChevronUp size={14} className="text-primary ms-1" />
    : <ChevronDown size={14} className="text-primary ms-1" />;
}
