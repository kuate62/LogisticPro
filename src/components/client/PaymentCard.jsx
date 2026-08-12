import { CreditCard } from 'lucide-react';
import { StatusBadge } from '../agent';

const METHOD_LABELS = {
  cash: 'Espèces', mobile_money: 'Mobile Money', bank_transfer: 'Virement', card: 'Carte',
};

export function PaymentCard({ payment, formatCurrency, formatDate }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 16px', borderBottom: '1px solid var(--color-border)',
      transition: 'background 150ms',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.02)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 'var(--radius-md)',
        background: 'var(--color-success-light)', color: 'var(--color-success)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <CreditCard size={18} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-heading)' }}>
          {formatCurrency(payment.amount)}
        </div>
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 1 }}>
          {payment.reference} · {METHOD_LABELS[payment.method] || payment.method} · {formatDate(payment.createdAt)}
        </div>
      </div>
      <StatusBadge status={payment.status === 'paid' ? 'paid' : 'pending'} />
    </div>
  );
}

export default PaymentCard;
