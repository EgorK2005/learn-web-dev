import { useState } from 'react';
import Header from './components/Header.jsx';
import Steps from './components/Steps.jsx';
import Calendar from './components/Calendar.jsx';
import TimeSlots from './components/TimeSlots.jsx';
import BookingBottomBar from './components/Bookingbottombar.jsx';
import Footer from './components/Footer.jsx';
import { TODAY, formatSelection } from './utils/date.js';
import { getSlotsForDate } from './data/slots.js';

function App() {
  const [currentMonth, setCurrentMonth] = useState(TODAY.getMonth());
  const [currentYear, setCurrentYear] = useState(TODAY.getFullYear());
  const [selectedDay, setSelectedDay] = useState(TODAY); 
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState(() => getSlotsForDate(TODAY));
  
  function handleSelectDay(date) {
    setSelectedDay(date);
    setSelectedTime(null);
    setSlots(getSlotsForDate(date));
  }

  function changeMonth(delta) {
    const next = new Date(currentYear, currentMonth + delta, 1);
    setCurrentMonth(next.getMonth());
    setCurrentYear(next.getFullYear());
    setSelectedDay(null);
    setSelectedTime(null);
    setSlots([]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!selectedDay || !selectedTime) {
      alert('Выберите дату и время');
      return;
    }
    alert(`Вы выбрали: ${formatSelection(selectedDay, selectedTime)}`);
  }

  return (
    <div className="page">
      <Header />
      <Steps />

      <main className="main">
        <div className="main__title-row">
          <a className="back" href="#" aria-label="Назад" onClick={(e) => e.preventDefault()}>
            <svg className="icon icon--back" width="10" height="12" viewBox="0 0 10 12">
              <path className="icon__path" d="M7 1.5 3 6l4 4.5" />
            </svg>
          </a>
          <h1 className="main__title">Дата и время</h1>
        </div>

        <div className="booking">
          <Calendar
            year={currentYear}
            month={currentMonth}
            selectedDay={selectedDay}
            onSelectDay={handleSelectDay}
            onPrevMonth={() => changeMonth(-1)}
            onNextMonth={() => changeMonth(1)}
          />
          <TimeSlots
            slots={slots}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
          />
        </div>

        <div className="main__actions">
          <BookingBottomBar selectedDay={selectedDay} selectedTime={selectedTime} />
          <a className="btn" href="#" onClick={handleSubmit}>Далее</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;