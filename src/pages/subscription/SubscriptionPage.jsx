import { useState } from 'react';
import { Repeat } from 'lucide-react';
import { useSubscriptionPlans, useSubscription, useSubscriptionPayments, useSubscriptionInvoices, useSubscriptionActions } from '../../hooks/useSubscription';
import PlanCard from '../../components/subscription/PlanCard';
import QuotaUsage from '../../components/subscription/QuotaUsage';
import RenewalSection from '../../components/subscription/RenewalSection';
import PaymentHistory from '../../components/subscription/PaymentHistory';
import InvoiceHistory from '../../components/subscription/InvoiceHistory';

export default function SubscriptionPage() {
  const { loading: plansLoading } = useSubscriptionPlans();
  const { subscription, currentPlan, quotas, loading: subLoading } = useSubscription();
  const { payments, loading: payLoading, pagination: payPagination, setPage: setPayPage } = useSubscriptionPayments();
  const { invoices, loading: invLoading, pagination: invPagination, setPage: setInvPage } = useSubscriptionInvoices();
  const { toggleAutoRenew, cancelSubscription } = useSubscriptionActions();
  const [activeTab, setActiveTab] = useState('payments');

  const isLoading = plansLoading || subLoading.subscription || subLoading.plan || subLoading.quotas;

  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-4">
        <Repeat size={22} className="text-primary" />
        <h4 className="fw-bold text-dark mb-0">Mon Abonnement</h4>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-3 shadow-sm p-5 text-center"><div className="spinner-border text-primary" role="status" /></div>
      ) : (
        <>
          <PlanCard plan={currentPlan} subscription={subscription} />

          <QuotaUsage quotas={quotas} />

          <RenewalSection subscription={subscription} onToggleAutoRenew={toggleAutoRenew} onCancel={cancelSubscription} />

          <div className="bg-white rounded-3 shadow-sm p-4">
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button type="button" className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => setActiveTab('payments')}>Historique paiements</button>
              </li>
              <li className="nav-item">
                <button type="button" className={`nav-link ${activeTab === 'invoices' ? 'active' : ''}`} onClick={() => setActiveTab('invoices')}>Historique factures</button>
              </li>
            </ul>

            {activeTab === 'payments' && (
              <PaymentHistory payments={payments} loading={payLoading} pagination={payPagination} onPageChange={setPayPage} />
            )}

            {activeTab === 'invoices' && (
              <InvoiceHistory invoices={invoices} loading={invLoading} pagination={invPagination} onPageChange={setInvPage} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
