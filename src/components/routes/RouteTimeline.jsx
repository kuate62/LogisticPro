import { Clock, Plus, Edit2, UserPlus, Package, Navigation, MapPin, XCircle } from 'lucide-react';

const eventIcons = {
  creation: Plus,
  modification: Edit2,
  affectation: UserPlus,
  chargement: Package,
  depart: Navigation,
  arrivee: MapPin,
  annulation: XCircle,
};

const eventColors = {
  creation: 'primary',
  modification: 'secondary',
  affectation: 'warning',
  chargement: 'info',
  depart: 'primary',
  arrivee: 'success',
  annulation: 'danger',
};

export default function RouteTimeline({ history, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-3 shadow-sm p-4">
        <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2">
          <Clock size={16} className="text-muted" /> Historique
        </h6>
        {[1, 2, 3].map((i) => (
          <div key={i} className={`d-flex gap-3 pb-3 ${i < 3 ? 'border-bottom' : ''}`}>
            <div className="bg-secondary bg-opacity-25 rounded-circle flex-shrink-0" style={{ width: 32, height: 32 }} />
            <div className="flex-grow-1">
              <div className="bg-secondary bg-opacity-25 rounded mb-2" style={{ height: 14, width: '80%' }} />
              <div className="bg-secondary bg-opacity-25 rounded" style={{ height: 10, width: '40%' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="bg-white rounded-3 shadow-sm p-4">
        <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2">
          <Clock size={16} className="text-muted" /> Historique
        </h6>
        <div className="text-muted small text-center py-4">Aucune activité</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3 shadow-sm p-4">
      <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2">
        <Clock size={16} className="text-muted" /> Historique
      </h6>
      {history.map((item, idx) => {
        const Icon = eventIcons[item.type] || Clock;
        const color = eventColors[item.type] || 'secondary';
        return (
          <div key={item.id} className={`d-flex gap-3 pb-3 ${idx < history.length - 1 ? 'border-bottom' : ''}`}>
            <div className={`rounded-circle bg-${color} bg-opacity-25 d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: 32, height: 32 }}>
              <Icon size={14} className={`text-${color}`} />
            </div>
            <div className="flex-grow-1">
              <div className="fw-medium small">{item.description}</div>
              <div className="text-muted" style={{ fontSize: 11 }}>{new Date(item.timestamp).toLocaleString('fr-FR')}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
