import { Clock } from 'lucide-react';

const typeColors = { creation: 'primary', validation: 'info', affectation: 'warning', paiement: 'success', livraison: 'success', annulation: 'danger', transport: 'info', modification: 'secondary' };

export default function ShipmentTimeline({ history, loading }) {
  if (loading) return <div className="text-muted small">Chargement...</div>;
  if (!history || history.length === 0) return <div className="text-muted small text-center py-4">Aucune activité</div>;

  return (
    <div className="bg-white rounded-3 shadow-sm p-4">
      <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2"><Clock size={16} className="text-muted" /> Historique</h6>
      {history.map((item, idx) => (
        <div key={item.id} className={`d-flex gap-3 pb-3 ${idx < history.length - 1 ? 'border-bottom' : ''}`}>
          <div className={`rounded-circle bg-${typeColors[item.type] || 'secondary'} bg-opacity-25 d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: 32, height: 32 }}>
            <div className={`rounded-circle bg-${typeColors[item.type] || 'secondary'}`} style={{ width: 10, height: 10 }} />
          </div>
          <div className="flex-grow-1">
            <div className="fw-medium small">{item.description}</div>
            <div className="text-muted" style={{ fontSize: 11 }}>{new Date(item.timestamp).toLocaleString('fr-FR')}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
