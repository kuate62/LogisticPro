import Badge from 'react-bootstrap/Badge';

const statusConfig = {
  active: { bg: 'success', text: 'Actif' },
  inactive: { bg: 'secondary', text: 'Inactif' },
  blocked: { bg: 'danger', text: 'Bloqué' },
};

export default function ClientStatus({ status }) {
  const config = statusConfig[status] || statusConfig.active;
  return <Badge bg={config.bg} className="px-2 py-1">{config.text}</Badge>;
}
