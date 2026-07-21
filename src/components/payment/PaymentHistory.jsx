import { Card } from 'react-bootstrap';
import { Clock, CheckCircle, XCircle, RotateCcw, Edit } from 'lucide-react';

const TYPE_ICONS = {
  creation: CheckCircle,
  validation: CheckCircle,
  modification: Edit,
  annulation: XCircle,
  remboursement: RotateCcw,
};

const TYPE_COLORS = {
  creation: 'success',
  validation: 'success',
  modification: 'info',
  annulation: 'danger',
  remboursement: 'warning',
};

export default function PaymentHistory({ history = [] }) {
  if (!history.length) {
    return <p className="text-muted text-center py-4">Aucun historique</p>;
  }

  return (
    <div className="position-relative">
      <div className="position-absolute" style={{ left: 15, top: 0, bottom: 0, width: 2, background: '#dee2e6' }} />
      {history.map((h) => {
        const Icon = TYPE_ICONS[h.type] || Clock;
        const color = TYPE_COLORS[h.type] || 'secondary';
        return (
          <div key={h.id} className="d-flex position-relative mb-3" style={{ paddingLeft: 36 }}>
            <div className="position-absolute" style={{ left: 7, top: 4 }}>
              <Icon size={16} className={`text-${color}`} />
            </div>
            <Card className="border-0 shadow-sm flex-grow-1">
              <Card.Body className="py-2 px-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="mb-1 small fw-semibold">{h.description}</p>
                    {h.amount > 0 && (
                      <small className="text-muted">{h.amount.toLocaleString('fr-FR')} FC</small>
                    )}
                  </div>
                  <small className="text-muted text-nowrap ms-2">
                    {new Date(h.timestamp).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </small>
                </div>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
