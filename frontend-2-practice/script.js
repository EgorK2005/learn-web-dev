// JavaScript для страницы выбора даты и времени.
//
// ЗАДАНИЕ
// ========
// Оживить свою свёрстанную страницу. Скорее всего на ней будет работать:
//   1. При открытии страницы выбрать день по умолчанию.
//   2. По клику на день — день становится выбранным,
//      слоты обновляются.
//   3. По клику на слот — время становится выбранным,
//      попадает в нижнюю панель.
//   4. Стрелки «‹» и «›» листают месяцы.
//   5. Дни раньше «сегодня» нельзя выбрать.
//   6. Нижняя панель обновляется при выборе дня и времени.
//
// ГДЕ ЖИВУТ ДАННЫЕ
// ----------------
// Слотов пока нет с сервера. Захардкодьте массив в этом файле.
// Формат слота: { time: "10:00", available: true }.
// «Сегодня» можно взять из new Date() или захардкодить —
// как удобнее для проверки.
//
// СТРУКТУРА КОДА
// --------------
// Разделите код на смысловые части комментариями:
//   1. Данные (слоты, «сегодня»).
//   2. Состояние (месяц, день, время, слоты).
//   3. Чистые функции (для работы с датами).
//   4. Отрисовка и обработчики.
//   5. Инициализация.
//
// ЧИСТЫЕ ФУНКЦИИ
// --------------
// Если понадобится строить сетку календаря — вот функция,
// которую можно использовать. Она не зависит от DOM,
// просто принимает год и месяц и возвращает массив недель.
//
// function buildCalendarGrid(year, month) {
//   const firstDay = new Date(year, month, 1);
//   const lastDay = new Date(year, month + 1, 0);
//   const daysInMonth = lastDay.getDate();
//   const startDayOfWeek = firstDay.getDay();
//   const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
//   const prevMonthLastDay = new Date(year, month, 0).getDate();
//
//   const cells = [];
//
//   for (let i = offset - 1; i >= 0; i--) {
//     cells.push({ day: prevMonthLastDay - i, otherMonth: true });
//   }
//   for (let d = 1; d <= daysInMonth; d++) {
//     cells.push({ day: d, otherMonth: false });
//   }
//   const totalCells = Math.ceil(cells.length / 7) * 7;
//   let nextDay = 1;
//   while (cells.length < totalCells) {
//     cells.push({ day: nextDay, otherMonth: true });
//     nextDay++;
//   }
//
//   const weeks = [];
//   for (let i = 0; i < cells.length; i += 7) {
//     weeks.push(cells.slice(i, i + 7));
//   }
//   return weeks;
// }

// Начните писать код здесь.


'use strict';


const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const MONTHS_GENITIVE = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const WEEKDAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда',
  'Четверг', 'Пятница', 'Суббота'];


const TIME_SLOTS = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];


const BUSY_PATTERNS = [
  ['11:00', '13:00'],
  ['10:00', '15:00'],
  ['12:00', '16:00'],
  ['14:00', '17:00'],
];


const TODAY = startOfDay(new Date());



const state = {
  currentMonth: TODAY.getMonth(),
  currentYear: TODAY.getFullYear(),
  selectedDay: null,   
  selectedTime: null,  
  slots: [],          
};


let titleEl, gridEl, timesEl, prevBtn, nextBtn, submitBtn;


function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}


function compareDates(a, b) {
  return startOfDay(a).getTime() - startOfDay(b).getTime();
}


function isDateSelectable(date) {
  return compareDates(date, TODAY) >= 0;
}


function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const offset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks = Math.ceil((offset + daysInMonth) / 7);

  const cells = [];
  for (let i = 0; i < weeks * 7; i++) {
    const date = new Date(year, month, 1 - offset + i);
    cells.push({ date, inMonth: date.getMonth() === month });
  }
  return cells;
}

function getSlotsForDate(date) {
  const busy = BUSY_PATTERNS[(date.getDate() + date.getMonth()) % BUSY_PATTERNS.length];
  return TIME_SLOTS.map((time) => ({ time, busy: busy.includes(time) }));
}


function formatSelection() {
  const d = state.selectedDay;
  const text = `${WEEKDAYS[d.getDay()]}, ${d.getDate()} ${MONTHS_GENITIVE[d.getMonth()]} ${d.getFullYear()}`;
  return state.selectedTime ? `${text} • ${state.selectedTime}` : text;
}


function renderCalendar() {
  titleEl.textContent = `${MONTHS[state.currentMonth]} ${state.currentYear}`;

  const cells = buildCalendarGrid(state.currentYear, state.currentMonth);
  gridEl.innerHTML = cells.map(({ date, inMonth }) => {
    const selectable = inMonth && isDateSelectable(date);
    const selected = inMonth && state.selectedDay && compareDates(date, state.selectedDay) === 0;

    const classes = ['day'];
    if (!selectable) classes.push('day--muted');
    if (selected) classes.push('day--selected');

    return `<li class="${classes.join(' ')}" data-year="${date.getFullYear()}" ` +
      `data-month="${date.getMonth()}" data-day="${date.getDate()}">${date.getDate()}</li>`;
  }).join('');

  gridEl.querySelectorAll('.day:not(.day--muted)').forEach((el) => {
    el.addEventListener('click', onDayClick);
  });
}

function renderTimeSlots() {
  timesEl.innerHTML = state.slots.map(({ time, busy }) => {
    const classes = ['slot'];
    if (busy) classes.push('slot--busy');
    if (!busy && time === state.selectedTime) classes.push('slot--selected');

    const note = busy ? '<span class="slot__note">Занято</span>' : '';
    return `<li class="${classes.join(' ')}" data-time="${time}">${time}${note}</li>`;
  }).join('');

  timesEl.querySelectorAll('.slot:not(.slot--busy)').forEach((el) => {
    el.addEventListener('click', onTimeSlotClick);
  });
}



function onDayClick(event) {
  const { year, month, day } = event.currentTarget.dataset;
  state.selectedDay = new Date(Number(year), Number(month), Number(day));
  state.selectedTime = null;
  state.slots = getSlotsForDate(state.selectedDay);

  renderCalendar();
  renderTimeSlots();
}

function onTimeSlotClick(event) {
  state.selectedTime = event.currentTarget.dataset.time;
  renderTimeSlots();
}

function changeMonth(delta) {
  state.currentMonth += delta;
  if (state.currentMonth < 0) {
    state.currentMonth = 11;
    state.currentYear--;
  } else if (state.currentMonth > 11) {
    state.currentMonth = 0;
    state.currentYear++;
  }
  renderCalendar();
}

function setupMonthNavigation() {
  prevBtn.addEventListener('click', (e) => { e.preventDefault(); changeMonth(-1); });
  nextBtn.addEventListener('click', (e) => { e.preventDefault(); changeMonth(1); });
}

function onSubmitClick(event) {
  event.preventDefault();
  if (!state.selectedDay || !state.selectedTime) {
    alert('Выберите дату и время');
    return;
  }
  alert(`Вы выбрали: ${formatSelection()}`);
}



function init() {
  titleEl = document.getElementById('calendar-title');
  gridEl = document.getElementById('calendar-grid');
  timesEl = document.getElementById('times-grid');
  prevBtn = document.getElementById('prev-month');
  nextBtn = document.getElementById('next-month');
  submitBtn = document.getElementById('next-btn');


  state.selectedDay = new Date(TODAY);
  state.slots = getSlotsForDate(state.selectedDay);

  renderCalendar();
  renderTimeSlots();
  setupMonthNavigation();
  submitBtn.addEventListener('click', onSubmitClick);
}

document.addEventListener('DOMContentLoaded', init);