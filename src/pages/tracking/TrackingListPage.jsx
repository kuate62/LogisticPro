import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import { RefreshCw, LayoutGrid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTracking } from '../../hooks/useTracking';
import { TrackingSummary, TrackingSearch, TrackingFilters, TrackingTable, TrackingCard } from '../../components/tracking';

export default function TrackingListPage() {
  const { trackings, loading, pagination, search, filters, sort, loadTrackings, updateSearch, updateFilters, updateSort, goToPage } = useTracking();
  const [viewMode, setViewMode] = useState('table');
  const navigate = useNavigate();

  useEffect(() => { loadTrackings(); }, [loadTrackings]);

  const handleRefresh = useCallback(() => { loadTrackings(); }, [loadTrackings]);

  const handleView = useCallback((tracking) => {
    navigate(`/tracking/${tracking.id}`);
  }, [navigate]);

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
          <h4 className="mb-0">Suivi des Colis</h4>
          <small className="text-muted">{pagination.total} enregistrements</small>
        </Col>
        <Col xs="auto" className="d-flex gap-2">
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

      <TrackingSummary trackings={trackings} />
      <TrackingSearch value={search} onChange={updateSearch} />
      <TrackingFilters filters={filters} onChange={updateFilters} />

      {viewMode === 'table' ? (
        <TrackingTable trackings={trackings} sort={sort} onSort={updateSort} onView={handleView} />
      ) : (
        <Row className="g-3">
          {trackings.map((t) => (
            <Col key={t.id} md={6} lg={4}>
              <TrackingCard tracking={t} onClick={handleView} />
            </Col>
          ))}
        </Row>
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
