import { Clock, PlusCircle, Edit3, CheckCircle, XCircle } from 'lucide-react';

const typeConfig = {
  creation: { icon: PlusCircle, color: 'primary' },
  modification: { icon: Edit3, color: 'info' },
  activation: { icon: CheckCircle, color: 'success' },
  desactivation: { icon: XCircle, color: 'danger' },
};

function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-3 shadow-sm p-4">
      <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2"><Clock size={16} className="text-muted" /> Historique</h6>
      {[1, 2, 3].map((i) => (
        <div key={i} className={`d-flex gap-3 pb-3 ${i < 3 ? 'border-bottom' : ''}`}>
          <div className="rounded-circle bg-secondary bg-opacity-25 flex-shrink-0" style={{ width: 32, height: 32 }} />
          <div className="flex-grow-1">
            <div className="bg-secondary bg-opacity-25 rounded mb-2" style={{ height: 14, width: '70%' }} />
            <div className="bg-secondary bg-opacity-25 rounded" style={{ height: 10, width: '40%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PricingHistory({ history, loading }) {
  if (loading) return <LoadingSkeleton />;
  if (!history || history.length === 0) return <div className="text-muted small text-center py-4">Aucune activité enregistrée</div>;

  return (
    <div className="bg-white rounded-3 shadow-sm p-4">
      <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2"><Clock size={16} className="text-muted" /> Historique</h6>
      {history.map((item, idx) => {
        const config = typeConfig[item.type] || typeConfig.modification;
        const Icon = config.icon;
        return (
          <div key={item.id} className={`d-flex gap-3 pb-3 ${idx < history.length - 1 ? 'border-bottom' : ''}`}>
            <div className={`rounded-circle bg-${config.color} bg-opacity-25 d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: 32, height: 32 }}>
              <Icon size={14} className={`text-${config.color}`} />
            </div>
            <div className="flex-grow-1">
              <div className="fw-medium small">{item.description}</div>
              {item.details && <div className="text-muted" style={{ fontSize: 12 }}>{item.details}</div>}
              <div className="text-muted" style={{ fontSize: 11 }}>{new Date(item.timestamp).toLocaleString('fr-FR')}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
