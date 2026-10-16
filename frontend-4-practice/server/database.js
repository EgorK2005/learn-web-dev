export const database = {
  today: { day: 16, month: 9, year: 2026 }, 


  slotsEvenDay: [
    { time: "10:00", available: true },
    { time: "11:00", available: true },
    { time: "12:00", available: false }, 
    { time: "13:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: false },
    { time: "17:00", available: true },
  ],


  slotsOddDay: [
    { time: "10:00", available: true },
    { time: "11:00", available: false }, 
    { time: "12:00", available: true },
    { time: "13:00", available: true },
    { time: "14:00", available: false }, 
    { time: "15:00", available: true },
    { time: "16:00", available: true },
    { time: "17:00", available: true },
  ],
};