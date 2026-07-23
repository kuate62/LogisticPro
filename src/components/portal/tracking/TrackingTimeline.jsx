import TrackingTimelineItem from './TrackingTimelineItem';

export default function TrackingTimeline({ events = [] }) {
  if (!events.length) {
    return (
      <div className="tks-timeline__empty">
        <p>Aucun événement enregistré</p>
      </div>
    );
  }

  return (
    <div className="tks-timeline">
      {events.map((event, i) => (
        <TrackingTimelineItem
          key={event.id || i}
          event={event}
          isFirst={i === 0}
          isLast={i === events.length - 1}
        />
      ))}
    </div>
  );
}
