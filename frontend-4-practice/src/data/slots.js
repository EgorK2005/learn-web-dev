export const TIME_SLOTS = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];


const BUSY_PATTERNS = [
  ['11:00', '13:00'],
  ['10:00', '15:00'],
  ['12:00', '16:00'],
  ['14:00', '17:00'],
];

export function getSlotsForDate(date) {
  const busy = BUSY_PATTERNS[(date.getDate() + date.getMonth()) % BUSY_PATTERNS.length];
  return TIME_SLOTS.map((time) => ({ time, busy: busy.includes(time) }));
}