import { useState, useEffect, useMemo } from 'react';
import { Bell, Info, AlertTriangle, CheckCircle, XCircle, CheckCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/admin/PageHeader';
import EmptyState from '../../components/admin/EmptyState';
import LoadingState from '../../components/admin/LoadingState';
import { useNotifications } from '../../hooks/useAdmin';
import './NotificationsPage.css';

const TYPE_CONFIG = {
  info: { icon: Info, color: 'info' },
  warning: { icon: AlertTriangle, color: 'warning' },
  success: { icon: CheckCircle, color: 'success' },
  error: { icon: XCircle, color: 'danger' },
};

const FILTER_TABS = [
  { value: 'all', label: 'Toutes' },
  { value: 'unread', label: 'Non lues' },
  { value: 'info', label: 'Info' },
  { value: 'warning', label: 'Alerte' },
  { value: 'success', label: 'Succès' },
  { value: 'error', label: 'Erreur' },
];

const formatRelativeDate = (iso) => {
  if (!iso) return '';
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMin / 60);
  const diffD = Math.floor(diffH / 24);

  if (diffMin < 1) return "À l'instant";
  if (diffMin < 60) return `Il y a ${diffMin} min`;
  if (diffH < 24) return `Il y a ${diffH}h`;
  if (diffD < 7) return `Il y a ${diffD}j`;
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function NotificationsPage() {
  const { notifications, loading, error, fetchNotifications, markNotificationRead, markAllNotificationsRead } = useNotifications();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const filtered = useMemo(() => {
    let list = notifications || [];
    if (filter === 'unread') {
      list = list.filter((n) => !n.read);
    } else if (['info', 'warning', 'success', 'error'].includes(filter)) {
      list = list.filter((n) => n.type === filter);
    }
    return list;
  }, [notifications, filter]);

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      toast.success('Toutes les notifications ont été marquées comme lues');
    } catch {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
    } catch {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="sa-notifications">
      <PageHeader
        title="Notifications"
        subtitle={`${notifications?.length || 0} notification(s)`}
        actions={[
          {
            label: 'Tout marquer comme lu',
            icon: CheckCheck,
            variant: 'secondary',
            onClick: handleMarkAllRead,
          },
        ]}
      />

      <div className="sa-notifications__tabs">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            className={`sa-notifications__tab ${filter === tab.value ? 'sa-notifications__tab--active' : ''}`}
            onClick={() => setFilter(tab.value)}
          >
            {tab.label}
            {tab.value === 'unread' && notifications && (
              <span className="sa-notifications__tab-count">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingState />
      ) : filtered.length === 0 ? (
        <EmptyState icon={Bell} title="Aucune notification" message="Vous n'avez aucune notification pour le moment." />
      ) : (
        <div className="sa-notifications__list">
          {filtered.map((notif) => {
            const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.info;
            const Icon = config.icon;
            return (
              <div
                key={notif.id}
                className={`sa-notifications__card sa-notifications__card--${config.color} ${!notif.read ? 'sa-notifications__card--unread' : ''}`}
                onClick={() => !notif.read && handleMarkRead(notif.id)}
              >
                <div className={`sa-notifications__card-icon sa-notifications__card-icon--${config.color}`}>
                  <Icon size={20} />
                </div>
                <div className="sa-notifications__card-content">
                  <div className="sa-notifications__card-header">
                    <h4 className="sa-notifications__card-title">{notif.title}</h4>
                    {!notif.read && <span className="sa-notifications__card-dot" />}
                  </div>
                  <p className="sa-notifications__card-message">{notif.message}</p>
                  <span className="sa-notifications__card-date">{formatRelativeDate(notif.createdAt)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
