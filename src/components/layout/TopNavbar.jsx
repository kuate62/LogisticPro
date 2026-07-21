import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDashboard } from '../../hooks/useDashboard';
import { ROLE_LABELS } from '../../config/constants';
import { Search, Bell, ChevronDown, User, Settings, LogOut, Menu } from 'lucide-react';
import './TopNavbar.css';

export function TopNavbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const { unreadCount, notifications, markAllNotificationsRead, formatTime } = useDashboard();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const today = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="lp-topnavbar">
      <div className="lp-topnavbar__left">
        <button
          className="lp-topnavbar__menu-btn"
          onClick={onToggleSidebar}
          aria-label="Ouvrir le menu"
        >
          <Menu size={22} />
        </button>
        <div className="lp-topnavbar__welcome">
          <h2 className="lp-topnavbar__greeting">
            Bonjour, {user?.firstName}
          </h2>
          <p className="lp-topnavbar__date">{today}</p>
        </div>
      </div>

      <div className="lp-topnavbar__center">
        <div className="lp-topnavbar__search">
          <Search size={18} className="lp-topnavbar__search-icon" />
          <input
            type="text"
            className="lp-topnavbar__search-input"
            placeholder="Rechercher colis, clients, expéditions..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="Recherche globale"
          />
        </div>
      </div>

      <div className="lp-topnavbar__right">
        <div className="lp-topnavbar__notif-wrapper" ref={notifRef}>
          <button
            className="lp-topnavbar__icon-btn"
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label={`Notifications (${unreadCount} non lues)`}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="lp-topnavbar__badge">{unreadCount}</span>
            )}
          </button>

          {notifOpen && (
            <div className="lp-topnavbar__dropdown lp-topnavbar__dropdown--notif">
              <div className="lp-topnavbar__dropdown-header">
                <span className="lp-topnavbar__dropdown-title">Notifications</span>
                <button
                  className="lp-topnavbar__dropdown-action"
                  onClick={markAllNotificationsRead}
                >
                  Tout marquer lu
                </button>
              </div>
              <div className="lp-topnavbar__dropdown-list">
                {notifications.length === 0 && (
                  <p className="lp-topnavbar__dropdown-empty">Aucune notification</p>
                )}
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`lp-notif-item ${!n.read ? 'lp-notif-item--unread' : ''}`}
                  >
                    <div className={`lp-notif-item__dot lp-notif-item__dot--${n.type}`} />
                    <div className="lp-notif-item__content">
                      <p className="lp-notif-item__title">{n.title}</p>
                      <p className="lp-notif-item__message">{n.message}</p>
                      <span className="lp-notif-item__time">{formatTime(n.time)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lp-topnavbar__user-wrapper" ref={userMenuRef}>
          <button
            className="lp-topnavbar__user-btn"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            aria-expanded={userMenuOpen}
            aria-label="Menu utilisateur"
          >
            <div className="lp-topnavbar__avatar">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="lp-topnavbar__user-info">
              <span className="lp-topnavbar__user-name">{user?.firstName} {user?.lastName}</span>
              <span className="lp-topnavbar__user-role">{ROLE_LABELS[user?.role] || user?.role}</span>
            </div>
            <ChevronDown size={16} className="lp-topnavbar__chevron" />
          </button>

          {userMenuOpen && (
            <div className="lp-topnavbar__dropdown">
              <button className="lp-topnavbar__dropdown-item" onClick={() => { setUserMenuOpen(false); navigate('/settings'); }}>
                <User size={16} /> Mon profil
              </button>
              <button className="lp-topnavbar__dropdown-item" onClick={() => { setUserMenuOpen(false); navigate('/settings'); }}>
                <Settings size={16} /> Paramètres
              </button>
              <div className="lp-topnavbar__dropdown-divider" />
              <button className="lp-topnavbar__dropdown-item lp-topnavbar__dropdown-item--danger" onClick={handleLogout}>
                <LogOut size={16} /> Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;
