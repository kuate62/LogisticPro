import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TablePagination({ page, perPage, total, totalPages, onPageChange }) {
  if (total <= perPage) return null;

  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="ag-pagination">
      <span className="ag-pagination__info">
        {start}–{end} sur {total}
      </span>
      <div className="ag-pagination__controls">
        <button
          className="ag-pagination__btn"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          type="button"
          aria-label="Page précédente"
        >
          <ChevronLeft size={16} />
        </button>
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="ag-pagination__btn" style={{ border: 'none', cursor: 'default' }}>...</span>
          ) : (
            <button
              key={p}
              className={`ag-pagination__btn ${p === page ? 'ag-pagination__btn--active' : ''}`}
              onClick={() => onPageChange(p)}
              type="button"
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}
        <button
          className="ag-pagination__btn"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          type="button"
          aria-label="Page suivante"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default TablePagination;
