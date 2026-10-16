import {
  MONTHS,
  buildCalendarGrid,
  compareDates,
  isDateSelectable,
} from '../utils/date.js';

const WEEKDAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function Calendar({ year, month, selectedDay, onSelectDay, onPrevMonth, onNextMonth }) {
  const cells = buildCalendarGrid(year, month);

  function handleArrowClick(event, callback) {
    event.preventDefault();
    callback();
  }

  return (
    <section className="card calendar">
      <div className="calendar__head">
        <h2 className="card__title">{MONTHS[month]} {year}</h2>
        <div className="calendar__nav">
          <a className="arrow" href="#" aria-label="Предыдущий месяц"
            onClick={(e) => handleArrowClick(e, onPrevMonth)}>
            <svg className="icon icon--arrow" width="10" height="12" viewBox="0 0 10 12">
              <path className="icon__path" d="M7 1.5 3 6l4 4.5" />
            </svg>
          </a>
          <a className="arrow" href="#" aria-label="Следующий месяц"
            onClick={(e) => handleArrowClick(e, onNextMonth)}>
            <svg className="icon icon--arrow" width="10" height="12" viewBox="0 0 10 12">
              <path className="icon__path" d="M3 1.5 7 6l-4 4.5" />
            </svg>
          </a>
        </div>
      </div>

      <ul className="calendar__weekdays">
        {WEEKDAY_LABELS.map((label) => (
          <li className="calendar__weekday" key={label}>{label}</li>
        ))}
      </ul>

      <ul className="calendar__grid">
        {cells.map(({ date, inMonth }) => {
          const selectable = inMonth && isDateSelectable(date);
          const selected = inMonth && selectedDay !== null && compareDates(date, selectedDay) === 0;
          const className = [
            'day',
            !selectable && 'day--muted',
            selected && 'day--selected',
          ].filter(Boolean).join(' ');

          return (
            <li
              className={className}
              key={date.getTime()}
              onClick={selectable ? () => onSelectDay(date) : undefined}
            >
              {date.getDate()}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Calendar;