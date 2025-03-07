import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Calendar interface
interface CalendarEntry {
  seqNo: number;
  week: string;
  weekLabel: string;
  month: string;
  monthLabel: string;
}

// Initial state with all 52 weeks
interface CalendarState {
  calendar: CalendarEntry[];
}

const initialState: CalendarState = {
  calendar: [
    { seqNo: 1, week: "W01", weekLabel: "Week 01", month: "M01", monthLabel: "Feb" },
    { seqNo: 2, week: "W02", weekLabel: "Week 02", month: "M01", monthLabel: "Feb" },
    { seqNo: 3, week: "W03", weekLabel: "Week 03", month: "M01", monthLabel: "Feb" },
    { seqNo: 4, week: "W04", weekLabel: "Week 04", month: "M01", monthLabel: "Feb" },
    { seqNo: 5, week: "W05", weekLabel: "Week 05", month: "M02", monthLabel: "Mar" },
    { seqNo: 6, week: "W06", weekLabel: "Week 06", month: "M02", monthLabel: "Mar" },
    { seqNo: 7, week: "W07", weekLabel: "Week 07", month: "M02", monthLabel: "Mar" },
    { seqNo: 8, week: "W08", weekLabel: "Week 08", month: "M02", monthLabel: "Mar" },
    { seqNo: 9, week: "W09", weekLabel: "Week 09", month: "M02", monthLabel: "Mar" },
    { seqNo: 10, week: "W10", weekLabel: "Week 10", month: "M03", monthLabel: "Apr" },
    { seqNo: 11, week: "W11", weekLabel: "Week 11", month: "M03", monthLabel: "Apr" },
    { seqNo: 12, week: "W12", weekLabel: "Week 12", month: "M03", monthLabel: "Apr" },
    { seqNo: 13, week: "W13", weekLabel: "Week 13", month: "M03", monthLabel: "Apr" },
    { seqNo: 14, week: "W14", weekLabel: "Week 14", month: "M04", monthLabel: "May" },
    { seqNo: 15, week: "W15", weekLabel: "Week 15", month: "M04", monthLabel: "May" },
    { seqNo: 16, week: "W16", weekLabel: "Week 16", month: "M04", monthLabel: "May" },
    { seqNo: 17, week: "W17", weekLabel: "Week 17", month: "M04", monthLabel: "May" },
    { seqNo: 18, week: "W18", weekLabel: "Week 18", month: "M05", monthLabel: "Jun" },
    { seqNo: 19, week: "W19", weekLabel: "Week 19", month: "M05", monthLabel: "Jun" },
    { seqNo: 20, week: "W20", weekLabel: "Week 20", month: "M05", monthLabel: "Jun" },
    { seqNo: 21, week: "W21", weekLabel: "Week 21", month: "M05", monthLabel: "Jun" },
    { seqNo: 22, week: "W22", weekLabel: "Week 22", month: "M05", monthLabel: "Jun" },
    { seqNo: 23, week: "W23", weekLabel: "Week 23", month: "M06", monthLabel: "Jul" },
    { seqNo: 24, week: "W24", weekLabel: "Week 24", month: "M06", monthLabel: "Jul" },
    { seqNo: 25, week: "W25", weekLabel: "Week 25", month: "M06", monthLabel: "Jul" },
    { seqNo: 26, week: "W26", weekLabel: "Week 26", month: "M06", monthLabel: "Jul" },
    { seqNo: 27, week: "W27", weekLabel: "Week 27", month: "M07", monthLabel: "Aug" },
    { seqNo: 28, week: "W28", weekLabel: "Week 28", month: "M07", monthLabel: "Aug" },
    { seqNo: 29, week: "W29", weekLabel: "Week 29", month: "M07", monthLabel: "Aug" },
    { seqNo: 30, week: "W30", weekLabel: "Week 30", month: "M07", monthLabel: "Aug" },
    { seqNo: 31, week: "W31", weekLabel: "Week 31", month: "M08", monthLabel: "Sep" },
    { seqNo: 32, week: "W32", weekLabel: "Week 32", month: "M08", monthLabel: "Sep" },
    { seqNo: 33, week: "W33", weekLabel: "Week 33", month: "M08", monthLabel: "Sep" },
    { seqNo: 34, week: "W34", weekLabel: "Week 34", month: "M08", monthLabel: "Sep" },
    { seqNo: 35, week: "W35", weekLabel: "Week 35", month: "M08", monthLabel: "Sep" },
    { seqNo: 36, week: "W36", weekLabel: "Week 36", month: "M09", monthLabel: "Oct" },
    { seqNo: 37, week: "W37", weekLabel: "Week 37", month: "M09", monthLabel: "Oct" },
    { seqNo: 38, week: "W38", weekLabel: "Week 38", month: "M09", monthLabel: "Oct" },
    { seqNo: 39, week: "W39", weekLabel: "Week 39", month: "M09", monthLabel: "Oct" },
    { seqNo: 40, week: "W40", weekLabel: "Week 40", month: "M10", monthLabel: "Nov" },
    { seqNo: 41, week: "W41", weekLabel: "Week 41", month: "M10", monthLabel: "Nov" },
    { seqNo: 42, week: "W42", weekLabel: "Week 42", month: "M10", monthLabel: "Nov" },
    { seqNo: 43, week: "W43", weekLabel: "Week 43", month: "M10", monthLabel: "Nov" },
    { seqNo: 44, week: "W44", weekLabel: "Week 44", month: "M11", monthLabel: "Dec" },
    { seqNo: 45, week: "W45", weekLabel: "Week 45", month: "M11", monthLabel: "Dec" },
    { seqNo: 46, week: "W46", weekLabel: "Week 46", month: "M11", monthLabel: "Dec" },
    { seqNo: 47, week: "W47", weekLabel: "Week 47", month: "M11", monthLabel: "Dec" },
    { seqNo: 48, week: "W48", weekLabel: "Week 48", month: "M11", monthLabel: "Dec" },
    { seqNo: 49, week: "W49", weekLabel: "Week 49", month: "M12", monthLabel: "Jan" },
    { seqNo: 50, week: "W50", weekLabel: "Week 50", month: "M12", monthLabel: "Jan" },
    { seqNo: 51, week: "W51", weekLabel: "Week 51", month: "M12", monthLabel: "Jan" },
    { seqNo: 52, week: "W52", weekLabel: "Week 52", month: "M12", monthLabel: "Jan" },
  ],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addCalendarEntry: (state, action: PayloadAction<CalendarEntry>) => {
      state.calendar.push(action.payload);
    },
  },
});

export const { addCalendarEntry } = calendarSlice.actions;
export default calendarSlice.reducer;
