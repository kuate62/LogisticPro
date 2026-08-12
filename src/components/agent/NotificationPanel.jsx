import { X, CheckCheck } from 'lucide-react';

function formatTime(date) {
  if (!date) return '';
  const d = new Date(date);
  return new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(d);
}

export function NotificationPanel({ notifications, onClose, onMarkRead, onMarkAllRead }) {
  return (
    <>
      <div className="ag-notif-panel__overlay" onClick={onClose} />
      <div className="ag-notif-panel" role="dialog" aria-label="Notifications">
        <div className="ag-notif-panel__header">
          <h2 className="ag-notif-panel__title">Notifications</h2>
          <div className="ag-notif-panel__actions">
            <button className="ag-notif-panel__btn" onClick={onMarkAllRead} type="button" aria-label="Tout marquer comme lu">
              <CheckCheck size={16} /> Tout lu
            </button>
            <button className="ag-notif-panel__btn" onClick={onClose} type="button" aria-label="Fermer">
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="ag-notif-panel__list">
          {notifications.length === 0 && (
            <div style={{ padding: 32, textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 13 }}>
              Aucune notification
            </div>
          )}
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`ag-notif-item ${!n.read ? 'ag-notif-item--unread' : ''}`}
              onClick={() => onMarkRead?.(n.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onMarkRead?.(n.id)}
            >
              <div className={`ag-notif-item__dot ag-notif-item__dot--${n.type}`} />
              <div className="ag-notif-item__content">
                <p className="ag-notif-item__title">{n.title}</p>
                {n.message && <p className="ag-notif-item__message">{n.message}</p>}
              </div>
              <span className="ag-notif-item__time">{formatTime(n.time)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NotificationPanel;
