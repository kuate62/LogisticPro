import { X } from 'lucide-react';
import { useEffect } from 'react';
import './AgencyModal.css';

export function AgencyModal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="lp-agency-modal__overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className={`lp-agency-modal lp-agency-modal--${size}`} onClick={(e) => e.stopPropagation()}>
        <div className="lp-agency-modal__header">
          <h2 className="lp-agency-modal__title">{title}</h2>
          <button className="lp-agency-modal__close" onClick={onClose} type="button" aria-label="Fermer">
            <X size={20} />
          </button>
        </div>
        <div className="lp-agency-modal__body">{children}</div>
      </div>
    </div>
  );
}

export default AgencyModal;
