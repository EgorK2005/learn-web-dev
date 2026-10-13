function TimeSlots({ slots, selectedTime, onSelectTime }) {
  return (
    <section className="card times">
      <h2 className="card__title times__title">Доступное время</h2>
      <ul className="times__grid">
        {slots.map(({ time, busy }) => {
          const className = [
            'slot',
            busy && 'slot--busy',
            !busy && time === selectedTime && 'slot--selected',
          ].filter(Boolean).join(' ');

          return (
            <li
              className={className}
              key={time}
              onClick={busy ? undefined : () => onSelectTime(time)}
            >
              {time}
              {busy && <span className="slot__note">Занято</span>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default TimeSlots;