import { Loader2 } from 'lucide-react';
import './LoadingButton.css';

export function LoadingButton({
  children,
  isLoading = false,
  loadingText,
  disabled,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <button
      className={`lp-btn lp-btn--${variant} lp-btn--${size} ${fullWidth ? 'lp-btn--full' : ''} ${isLoading ? 'lp-btn--loading' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 size={16} className="lp-btn__spinner" />
          {loadingText || 'Chargement...'}
        </>
      ) : (
        <>
          {Icon && <Icon size={16} className="lp-btn__icon" />}
          {children}
        </>
      )}
    </button>
  );
}

export default LoadingButton;
