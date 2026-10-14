import { WEEKDAYS, MONTHS_GENITIVE } from '../utils/date.js';

function BookingBottomBar({ selectedDay, selectedTime }) {
  if (!selectedDay) {
    return (
      <section className="bottom-bar">
        <span className="bottom-bar__empty">Выберите дату</span>
      </section>
    );
  }

  const weekday = WEEKDAYS[selectedDay.getDay()];
  const day = selectedDay.getDate();
  const month = MONTHS_GENITIVE[selectedDay.getMonth()];
  const year = selectedDay.getFullYear();

  return (
    <section className="bottom-bar">
      <span className="bottom-bar__date">{weekday}, {day} {month} {year}</span>
      <span className="bottom-bar__sep">•</span>
      {selectedTime
        ? <span className="bottom-bar__time">{selectedTime}</span>
        : <span className="bottom-bar__empty">Время не выбрано</span>}
    </section>
  );
}

export default BookingBottomBar;