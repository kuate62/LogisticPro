import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NAV_ITEMS, SUPER_ADMIN_NAV, NAV_FOOTER, SIDEBAR_WIDTH_EXPANDED, SIDEBAR_WIDTH_COLLAPSED } from '../../config/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AuthLogo } from '../auth';
import './Sidebar.css';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isSuperAdmin = user?.role === 'super_admin';
  const navItems = isSuperAdmin ? [...SUPER_ADMIN_NAV, ...NAV_ITEMS] : NAV_ITEMS;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleAction = (item) => {
    if (item.action === 'logout') handleLogout();
  };

  const width = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <aside className="lp-sidebar" style={{ width }}>
      <div className="lp-sidebar__header">
        {!collapsed && <AuthLogo size="sm" />}
        {collapsed && (
          <div className="lp-sidebar__logo-collapsed">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#2563EB" />
              <path d="M8 16L14 10L20 16L14 22L8 16Z" fill="white" fillOpacity="0.9" />
              <path d="M14 16L20 10L26 16L20 22L14 16Z" fill="white" fillOpacity="0.6" />
            </svg>
          </div>
        )}
        <button
          className="lp-sidebar__toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Développer le menu' : 'Réduire le menu'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="lp-sidebar__nav" role="navigation" aria-label="Navigation principale">
        <ul className="lp-sidebar__list">
          {navItems.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `lp-sidebar__link ${isActive ? 'lp-sidebar__link--active' : ''}`
                }
                title={collapsed ? item.label : undefined}
                end={item.key === 'dashboard'}
              >
                <item.icon size={20} className="lp-sidebar__icon" />
                {!collapsed && <span className="lp-sidebar__label">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="lp-sidebar__footer">
        <ul className="lp-sidebar__list">
          {NAV_FOOTER.map((item) => (
            <li key={item.key}>
              <button
                className="lp-sidebar__link lp-sidebar__link--btn"
                onClick={() => handleAction(item)}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={20} className="lp-sidebar__icon" />
                {!collapsed && <span className="lp-sidebar__label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
