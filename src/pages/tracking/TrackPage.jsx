import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Package, Shield, Clock, Phone } from 'lucide-react';
import { usePortalTracking } from '../../hooks/usePortalTracking';
import {
  TrackingSearch,
  TrackingResultCard,
  TrackingTimeline,
  TrackingSummaryCard,
  TrackingHistory,
  TrackingEmptyState,
  TrackingErrorState,
  TrackingLoadingState,
  TrackingFAQ,
  TrackingActions,
} from '../../components/portal/tracking';
import './TrackPage.css';

export default function TrackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    result, timeline, history, loading, error, searched,
    search, clearHistory, reset,
  } = usePortalTracking();

  const handleSearch = useCallback((trackingNumber) => {
    search(trackingNumber);
    setSearchParams({ number: trackingNumber });
  }, [search, setSearchParams]);

  const handleReset = useCallback(() => {
    reset();
    setSearchParams({});
  }, [reset, setSearchParams]);

  useEffect(() => {
    const number = searchParams.get('number');
    if (number && !searched) {
      search(number);
    }
  }, [searchParams, search, searched]);

  return (
    <div className="tks-page">
      <section className="tks-hero">
        <Container>
          <div className="tks-hero__content">
            <div className="tks-hero__icon">
              <Package size={32} />
            </div>
            <h1 className="tks-hero__title">Suivi de colis</h1>
            <p className="tks-hero__subtitle">
              Entrez votre numéro de suivi pour connaître la position exacte de votre colis en temps réel.
            </p>
          </div>
          <TrackingSearch
            onSearch={handleSearch}
            loading={loading}
            defaultValue={searchParams.get('number') || ''}
          />
          <div className="tks-hero__badges">
            <div className="tks-hero__badge">
              <Clock size={14} />
              Temps réel
            </div>
            <div className="tks-hero__badge">
              <Shield size={14} />
              Sans inscription
            </div>
            <div className="tks-hero__badge">
              <Phone size={14} />
              Support 7j/7
            </div>
          </div>
        </Container>
      </section>

      <section className="tks-body">
        <Container>
          {loading && <TrackingLoadingState />}

          {!loading && error && (
            <TrackingErrorState
              error={error}
              onReset={handleReset}
            />
          )}

          {!loading && !error && searched && result && (
            <div className="tks-body__result">
              <div className="tks-body__main">
                <TrackingResultCard result={result} />
                <TrackingTimeline events={timeline} />
                <TrackingActions onNewSearch={handleReset} />
              </div>
              <div className="tks-body__sidebar">
                <TrackingSummaryCard result={result} eventCount={timeline.length} />
              </div>
            </div>
          )}

          {!loading && !error && !searched && (
            <>
              {history.length > 0 && (
                <TrackingHistory
                  history={history}
                  onSelect={handleSearch}
                  onClear={clearHistory}
                />
              )}
              <TrackingEmptyState onSearch={handleSearch} />
            </>
          )}
        </Container>
      </section>

      <section className="tks-faq-section">
        <Container>
          <TrackingFAQ />
        </Container>
      </section>
    </div>
  );
}
