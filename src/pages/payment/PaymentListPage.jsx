import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import { RefreshCw, LayoutGrid, List, Plus } from 'lucide-react';
import { usePayments } from '../../hooks/usePayment';
import { PaymentSummary, PaymentSearch, PaymentFilters, PaymentTable } from '../../components/payment';

export default function PaymentListPage() {
  const { payments, loading, pagination, search, filters, sort, loadPayments, updateSearch, updateFilters, updateSort, goToPage } = usePayments();
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => { loadPayments(); }, [loadPayments]);

  const handleRefresh = useCallback(() => { loadPayments(); }, [loadPayments]);

  const handleView = useCallback((payment) => {
    window.location.href = `/payments/${payment.id}`;
  }, []);

  const pages = [];
  for (let i = 1; i <= pagination.totalPages; i++) {
    pages.push(
      <Pagination.Item key={i} active={i === pagination.page} onClick={() => goToPage(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h4 className="mb-0">Paiements</h4>
          <small className="text-muted">{pagination.total} enregistrements</small>
        </Col>
        <Col xs="auto" className="d-flex gap-2">
          <a href="/payments/new" className="btn btn-primary btn-sm d-flex align-items-center gap-1">
            <Plus size={16} /> Nouveau paiement
          </a>
          <Button
            variant={viewMode === 'table' ? 'primary' : 'outline-primary'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            <List size={16} />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid size={16} />
          </Button>
          <Button variant="outline-secondary" size="sm" onClick={handleRefresh} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spin' : ''} />
          </Button>
        </Col>
      </Row>

      <PaymentSummary payments={payments} />
      <PaymentSearch value={search} onChange={updateSearch} />
      <PaymentFilters filters={filters} onChange={updateFilters} />

      {viewMode === 'table' ? (
        <PaymentTable payments={payments} sort={sort} onSort={updateSort} onView={handleView} />
      ) : (
        <div className="text-center py-5 text-muted">
          <p>Vue grille — à venir</p>
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev onClick={() => goToPage(pagination.page - 1)} disabled={pagination.page <= 1} />
            {pages}
            <Pagination.Next onClick={() => goToPage(pagination.page + 1)} disabled={pagination.page >= pagination.totalPages} />
          </Pagination>
        </div>
      )}
    </Container>
  );
}
