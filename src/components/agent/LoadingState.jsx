export function LoadingState({ rows = 5 }) {
  return (
    <div className="ag-loading">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={`ag-loading__row ${
            i === 0 ? 'ag-loading__row--lg'
            : i === rows - 1 ? 'ag-loading__row--sm'
            : 'ag-loading__row--md'
          }`}
        />
      ))}
    </div>
  );
}

export default LoadingState;
