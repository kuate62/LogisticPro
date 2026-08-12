import { Outlet } from 'react-router-dom';
import { AuthLogo } from '../components/auth';
import './AuthLayout.css';

export function AuthLayout() {
  return (
    <div className="lp-auth-layout">
      <header className="lp-auth-layout__header" style={{ backgroundColor: '#5980d4ef' }}>
        <AuthLogo />
      </header>
      <main className="lp-auth-layout__main">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
