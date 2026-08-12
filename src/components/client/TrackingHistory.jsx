import { Check, Clock } from 'lucide-react';
import { ClientStatusBadge } from './ClientStatusBadge';

export function TrackingHistory({ history, formatDateTime }) {
  if (!history || history.length === 0) {
    return (
      <div className="ag-empty">
        <p className="ag-empty__desc">Aucun événement enregistré.</p>
      </div>
    );
  }

  return (
    <div className="client-tracking-history">
      {history.map((event, i) => {
        const isLast = i === history.length - 1;
        return (
          <div key={event.id} className="client-tracking-event">
            <div className="client-tracking-event__line">
              <span className="client-tracking-event__dot">
                {isLast ? <Check size={11} /> : <Clock size={11} />}
              </span>
              {!isLast && <span className="client-tracking-event__rail" />}
            </div>
            <div className="client-tracking-event__content">
              <div className="client-tracking-event__head">
                <ClientStatusBadge status={event.status} />
                <span className="client-tracking-event__date">
                  {formatDateTime(event.date)}
                </span>
              </div>
              <p className="client-tracking-event__desc">{event.description}</p>
              <span className="client-tracking-event__location">{event.location}</span>
              {event.agentName && (
                <span className="client-tracking-event__agent">Agent : {event.agentName}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TrackingHistory;
