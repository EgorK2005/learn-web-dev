import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Steps from './components/Steps.jsx';
import Calendar from './components/Calendar.jsx';
import TimeSlots from './components/TimeSlots.jsx';
import BookingBottomBar from './components/Bookingbottombar.jsx';
import Footer from './components/Footer.jsx';
import { formatSelection, startOfDay } from './utils/date.js';
import { fetchToday, fetchSlots } from './api.js';


function toDate({ day, month, year }) {
  return startOfDay(new Date(year, month, day));
}


function toDateParts(date) {
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
}

function App() {
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null); // Date
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState([]);

  const [loadingToday, setLoadingToday] = useState(true);
  const [errorToday, setErrorToday] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [errorSlots, setErrorSlots] = useState(null);


  useEffect(() => {
    let cancelled = false;

    async function loadToday() {
      setLoadingToday(true);
      setErrorToday(null);

      try {
        const data = await fetchToday(); 
        if (cancelled) return;

        const today = toDate(data);

        setSelectedDay(today);
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
      } catch (err) {
        if (!cancelled) {
          setErrorToday(err.message || 'Ошибка загрузки');
        }
      } finally {
        if (!cancelled) {
          setLoadingToday(false);
        }
      }
    }

    loadToday();
    return () => { cancelled = true; };
  }, []);


  useEffect(() => {
    if (!selectedDay) return;

    let cancelled = false;

    async function loadSlots() {
      setLoadingSlots(true);
      setErrorSlots(null);
      setSlots([]);
      setSelectedTime(null);

      try {
        const data = await fetchSlots(toDateParts(selectedDay));
        if (cancelled) return;


        const responseDate = toDate(data.date);
        if (responseDate.getTime() !== selectedDay.getTime()) {
          return; 
        }

        const normalized = data.slots.map((slot) => ({
          time: slot.time,
          busy: !slot.available,
        }));

        setSlots(normalized);
      } catch (err) {
        if (!cancelled) {
          setErrorSlots(err.message || 'Ошибка загрузки слотов');
        }
      } finally {
        if (!cancelled) {
          setLoadingSlots(false);
        }
      }
    }

    loadSlots();
    return () => { cancelled = true; };
  }, [selectedDay]);

  function handleSelectDay(date) {
    setSelectedDay(date);
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

  // === Рендер ===

  if (loadingToday) {
    return (
      <div className="page">
        <Header />
        <Steps />
        <main className="main">
          <p style={{ padding: '40px', textAlign: 'center' }}>Загрузка…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (errorToday) {
    return (
      <div className="page">
        <Header />
        <Steps />
        <main className="main">
          <p style={{ padding: '40px', textAlign: 'center', color: '#ff6b6b' }}>
            Ошибка: {errorToday}
          </p>
        </main>
        <Footer />
      </div>
    );
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

          {loadingSlots ? (
            <section className="card times">
              <h2 className="card__title times__title">Доступное время</h2>
              <p style={{ padding: '20px 0', textAlign: 'center' }}>Загрузка слотов…</p>
            </section>
          ) : errorSlots ? (
            <section className="card times">
              <h2 className="card__title times__title">Доступное время</h2>
              <p style={{ padding: '20px 0', textAlign: 'center', color: '#ff6b6b' }}>
                {errorSlots}
              </p>
            </section>
          ) : (
            <TimeSlots
              slots={slots}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />
          )}
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