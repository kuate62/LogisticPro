import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CompanyPagination({ page, totalPages, perPage, setPage, setPerPage }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav className="cat-pagination" aria-label="Pagination">
      <div className="cat-pagination__per-page">
        <label htmlFor="cat-per-page">Afficher</label>
        <select
          id="cat-per-page"
          className="cat-pagination__select"
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
        >
          {[6, 9, 12, 24].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <span>par page</span>
      </div>

      <div className="cat-pagination__controls">
        <button
          className="cat-pagination__btn"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          aria-label="Page précédente"
        >
          <ChevronLeft size={16} />
        </button>

        {start > 1 && (
          <>
            <button className="cat-pagination__page" onClick={() => setPage(1)}>1</button>
            {start > 2 && <span className="cat-pagination__ellipsis">...</span>}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            className={`cat-pagination__page ${p === page ? 'cat-pagination__page--active' : ''}`}
            onClick={() => setPage(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="cat-pagination__ellipsis">...</span>}
            <button className="cat-pagination__page" onClick={() => setPage(totalPages)}>{totalPages}</button>
          </>
        )}

        <button
          className="cat-pagination__btn"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          aria-label="Page suivante"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}
