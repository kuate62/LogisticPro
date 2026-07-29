import { useEffect } from 'react';
import CompanyHero from '../../components/catalog/CompanyHero';
import CompanySearchBar from '../../components/catalog/CompanySearchBar';
import CompanyFilters from '../../components/catalog/CompanyFilters';
import CompanySort from '../../components/catalog/CompanySort';
import CompanyResultCounter from '../../components/catalog/CompanyResultCounter';
import CompanyGrid from '../../components/catalog/CompanyGrid';
import CompanyPagination from '../../components/catalog/CompanyPagination';
import EmptyCompanies from '../../components/catalog/EmptyCompanies';
import LoadingCompanies from '../../components/catalog/LoadingCompanies';
import useCompanyCatalogStore from '../../store/useCompanyCatalogStore';
import './Catalog.css';

export default function CompanyCatalogPage() {
  const {
    companies, loading, error, query, filters, sort, pagination,
    fetchCompanies, setPage, setPerPage,
  } = useCompanyCatalogStore();

  useEffect(() => { fetchCompanies(); }, [fetchCompanies, query, filters, sort, pagination.page, pagination.perPage]);

  const hasActiveFilters = query || Object.values(filters).some((v) => v && v !== '');
  const showSuggestions = !loading && companies.length === 0 && hasActiveFilters;

  return (
    <div className="cat-page">
      <CompanyHero />

      <div className="cat-page__body">
        <div className="cat-page__toolbar">
          <CompanySearchBar />
          <CompanySort />
        </div>

        <div className="cat-page__content">
          <aside className="cat-page__sidebar">
            <CompanyFilters />
          </aside>

          <main className="cat-page__main">
            <div className="cat-page__results-bar">
              <CompanyResultCounter total={pagination.total} />
            </div>

            {error ? (
              <EmptyCompanies type="error" />
            ) : loading ? (
              <LoadingCompanies />
            ) : companies.length === 0 ? (
              <>
                <EmptyCompanies type={hasActiveFilters ? 'search' : 'empty'} />
                {showSuggestions && (
                  <div className="cat-suggestions">
                    <h3 className="cat-suggestions__title">Suggestions</h3>
                    <p className="cat-suggestions__text">
                      Réinitialisez les filtres pour voir toutes les entreprises disponibles.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <CompanyGrid companies={companies} />
                <CompanyPagination
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                  total={pagination.total}
                  perPage={pagination.perPage}
                  setPage={setPage}
                  setPerPage={setPerPage}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
