import ClientTimeline from './ClientTimeline';

export default function ClientHistory({ history, loading }) {
  return (
    <div>
      <ClientTimeline history={history} loading={loading} />
    </div>
  );
}
