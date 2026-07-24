import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

function getPageNumbers(current, total) {
  const maxVisible = 5;
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, current - half);
  let end = start + maxVisible - 1;

  if (end > total) {
    end = total;
    start = end - maxVisible + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="sa-pagination">
      <button
        className="sa-pagination__btn sa-pagination__nav"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={16} />
        <span>Précédent</span>
      </button>

      <div className="sa-pagination__pages">
        {pages[0] > 1 && (
          <>
            <button className="sa-pagination__page" onClick={() => onPageChange(1)}>
              1
            </button>
            {pages[0] > 2 && <span className="sa-pagination__ellipsis">...</span>}
          </>
        )}
        {pages.map((page) => (
          <button
            key={page}
            className={`sa-pagination__page ${page === currentPage ? 'sa-pagination__page--active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="sa-pagination__ellipsis">...</span>
            )}
            <button className="sa-pagination__page" onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        className="sa-pagination__btn sa-pagination__nav"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span>Suivant</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
