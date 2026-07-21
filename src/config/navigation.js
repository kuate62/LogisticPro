import {
  Package, Truck, Users, Building2, BarChart3,
  Settings, CreditCard, Route, LogOut,
  LayoutDashboard, Search, Tags, Repeat,
  Globe, UserCog, DollarSign,
} from 'lucide-react';

export const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { key: 'packages', label: 'Colis', icon: Package, path: '/packages' },
  { key: 'shipments', label: 'Expéditions', icon: Truck, path: '/shipments' },
  { key: 'tracking', label: 'Suivi', icon: Search, path: '/tracking' },
  { key: 'payments', label: 'Paiements', icon: DollarSign, path: '/payments' },
  { key: 'customers', label: 'Clients', icon: Users, path: '/customers' },
  { key: 'agencies', label: 'Agences', icon: Building2, path: '/agencies' },
  { key: 'counters', label: 'Comptoirs', icon: Tags, path: '/counters' },
  { key: 'routes', label: 'Trajets', icon: Route, path: '/routes' },
  { key: 'pricing', label: 'Tarification', icon: CreditCard, path: '/pricing' },
  { key: 'employees', label: 'Employés', icon: Users, path: '/employees' },
  { key: 'users', label: 'Utilisateurs', icon: UserCog, path: '/users' },
  { key: 'reports', label: 'Rapports', icon: BarChart3, path: '/reports' },
  { key: 'subscription', label: 'Abonnement', icon: Repeat, path: '/subscription' },
  { key: 'settings', label: 'Paramètres', icon: Settings, path: '/settings' },
];

export const SUPER_ADMIN_NAV = [
  { key: 'companies', label: 'Entreprises', icon: Globe, path: '/companies' },
];

export const NAV_FOOTER = [
  { key: 'logout', label: 'Déconnexion', icon: LogOut, action: 'logout' },
];

export const SIDEBAR_WIDTH_EXPANDED = 280;
export const SIDEBAR_WIDTH_COLLAPSED = 80;
export const TOPNAVBAR_HEIGHT = 72;
