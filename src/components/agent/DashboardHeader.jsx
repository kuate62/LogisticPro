import { useEffect, useState } from 'react';
import { Bell, Building2, MapPin } from 'lucide-react';

export function DashboardHeader({ agent, agency, company, unreadCount, onNotificationClick }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const initials = agent
    ? `${agent.firstName?.[0] || ''}${agent.lastName?.[0] || ''}`
    : 'AG';

  const dateStr = time.toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const timeStr = time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="ag-header">
      <div className="ag-header__left">
        <div className="ag-header__avatar">{initials}</div>
        <div className="ag-header__info">
          <h1>{agent ? `Bonjour, ${agent.firstName} ${agent.lastName}` : 'Bonjour'}</h1>
          <div className="ag-header__meta">
            {company && (
              <span className="ag-header__meta-item">
                <Building2 size={14} /> {company.name}
              </span>
            )}
            {agency && (
              <span className="ag-header__meta-item">
                <MapPin size={14} /> {agency.name}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="ag-header__right">
        <div className="ag-header__time">
          <div className="ag-header__date">{dateStr}</div>
          <div className="ag-header__clock">{timeStr}</div>
        </div>
        <button className="ag-notif-bell" onClick={onNotificationClick} type="button" aria-label="Notifications">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="ag-notif-bell__badge">{unreadCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;
