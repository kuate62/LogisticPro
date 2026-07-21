import Pagination from 'react-bootstrap/Pagination';

export default function PaginationBar({ pagination, onPageChange }) {
  const { page, totalPages, total } = pagination;
  if (totalPages <= 1) return null;

  const items = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  items.push(<Pagination.First key="first" onClick={() => onPageChange(1)} disabled={page === 1} />);
  items.push(<Pagination.Prev key="prev" onClick={() => onPageChange(page - 1)} disabled={page === 1} />);

  if (start > 1) items.push(<Pagination.Ellipsis key="e1" disabled />);
  for (let i = start; i <= end; i++) {
    items.push(<Pagination.Item key={i} active={i === page} onClick={() => onPageChange(i)}>{i}</Pagination.Item>);
  }
  if (end < totalPages) items.push(<Pagination.Ellipsis key="e2" disabled />);

  items.push(<Pagination.Next key="next" onClick={() => onPageChange(page + 1)} disabled={page === totalPages} />);
  items.push(<Pagination.Last key="last" onClick={() => onPageChange(totalPages)} disabled={page === totalPages} />);

  return (
    <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
      <span className="text-muted small">{total} résultat{total > 1 ? 's' : ''}</span>
      <Pagination className="mb-0" size="sm">{items}</Pagination>
    </div>
  );
}
