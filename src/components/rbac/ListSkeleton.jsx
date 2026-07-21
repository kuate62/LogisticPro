export default function ListSkeleton({ rows = 5 }) {
  return (
    <div className="bg-white rounded-3 p-4 shadow-sm">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={`d-flex align-items-center py-3 ${i < rows - 1 ? 'border-bottom' : ''}`}>
          <div className="rounded-circle bg-secondary bg-opacity-25 me-3" style={{ width: 36, height: 36 }} />
          <div className="flex-grow-1">
            <div className="bg-secondary bg-opacity-25 rounded" style={{ width: '35%', height: 14 }} />
            <div className="bg-secondary bg-opacity-25 rounded mt-1" style={{ width: '20%', height: 10 }} />
          </div>
          <div className="bg-secondary bg-opacity-25 rounded" style={{ width: 70, height: 24 }} />
        </div>
      ))}
    </div>
  );
}
