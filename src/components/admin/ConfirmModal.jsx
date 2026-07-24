import { X } from 'lucide-react';
import './ConfirmModal.css';

export default function ConfirmModal({
  show,
  title,
  message,
  confirmLabel = 'Confirmer',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
}) {
  if (!show) return null;

  return (
    <div className="sa-confirm-modal__overlay" onClick={onCancel}>
      <div className="sa-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sa-confirm-modal__header">
          <h3 className="sa-confirm-modal__title">{title}</h3>
          <button className="sa-confirm-modal__close" onClick={onCancel}>
            <X size={18} />
          </button>
        </div>
        <div className="sa-confirm-modal__body">
          <p className="sa-confirm-modal__message">{message}</p>
        </div>
        <div className="sa-confirm-modal__footer">
          <button className="sa-confirm-modal__btn sa-confirm-modal__btn--cancel" onClick={onCancel}>
            Annuler
          </button>
          <button
            className={`sa-confirm-modal__btn sa-confirm-modal__btn--${confirmVariant}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
