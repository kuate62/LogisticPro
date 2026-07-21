import { Card } from 'react-bootstrap';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import TrackingStatusBadge from './TrackingStatusBadge';

export default function TrackingTimeline({ events = [] }) {
  if (!events.length) {
    return <p className="text-muted text-center py-4">Aucun événement enregistré</p>;
  }

  const getIcon = (status) => {
    if (status === 'exception') return <AlertCircle size={16} className="text-danger" />;
    if (['delivered_to_recipient', 'picked_up_by_recipient'].includes(status)) return <CheckCircle size={16} className="text-success" />;
    return <Clock size={16} className="text-primary" />;
  };

  return (
    <div className="position-relative">
      <div className="timeline-line position-absolute" style={{ left: 15, top: 0, bottom: 0, width: 2, background: '#dee2e6' }} />
      {events.map((event, i) => (
        <div key={event.id || i} className="d-flex position-relative mb-3" style={{ paddingLeft: 36 }}>
          <div className="position-absolute" style={{ left: 7, top: 4 }}>
            {getIcon(event.status)}
          </div>
          <Card className="border-0 shadow-sm flex-grow-1">
            <Card.Body className="py-2 px-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <TrackingStatusBadge status={event.status} />
                  <p className="mb-1 mt-1 small">{event.description}</p>
                  {event.location && (
                    <small className="text-muted">{event.location}</small>
                  )}
                </div>
                <small className="text-muted text-nowrap ms-2">
                  {new Date(event.timestamp).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                </small>
              </div>
              {event.agentName && (
                <small className="text-muted">Agent: {event.agentName}</small>
              )}
              {event.estimatedArrival && (
                <small className="text-muted d-block">Arrivée estimée: {new Date(event.estimatedArrival).toLocaleDateString('fr-FR')}</small>
              )}
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}
