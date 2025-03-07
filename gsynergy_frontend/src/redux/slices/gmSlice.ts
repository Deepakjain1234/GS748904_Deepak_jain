import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GMData {
  week: string;
  gmDollars: number;
  gmPercent: number;
}

const initialState: GMData[] = [
    { week: "W01", gmDollars: 140061.78, gmPercent: 58 },
    { week: "W02", gmDollars: 110391.21, gmPercent: 43 },
    { week: "W03", gmDollars: 101657.28, gmPercent: 39 },
    { week: "W04", gmDollars: 134341.07, gmPercent: 40 },
    { week: "W05", gmDollars: 130398.15, gmPercent: 47 },
    { week: "W06", gmDollars: 137438.96, gmPercent: 43 },
    { week: "W07", gmDollars: 116387.03, gmPercent: 46 },
    { week: "W08", gmDollars: 159070.65, gmPercent: 47 },
    { week: "W09", gmDollars: 88328.55, gmPercent: 51 },
    { week: "W10", gmDollars: 119284.46, gmPercent: 46 },
    { week: "W11", gmDollars: 130099.18, gmPercent: 45 },
    { week: "W12", gmDollars: 139360.58, gmPercent: 49 },
    { week: "W13", gmDollars: 128456.87, gmPercent: 44 },
    { week: "W14", gmDollars: 86661.91, gmPercent: 46 },
    { week: "W15", gmDollars: 151592.15, gmPercent: 56 },
    { week: "W16", gmDollars: 151686.17, gmPercent: 44 },
    { week: "W17", gmDollars: 88672.61, gmPercent: 43 },
    { week: "W18", gmDollars: 81851.01, gmPercent: 47 },
    { week: "W19", gmDollars: 117644.42, gmPercent: 46 },
    { week: "W20", gmDollars: 75460.72, gmPercent: 38 },
    { week: "W21", gmDollars: 89873.37, gmPercent: 39 },
    { week: "W22", gmDollars: 217801.24, gmPercent: 54 },
    { week: "W23", gmDollars: 80015.21, gmPercent: 43 },
    { week: "W24", gmDollars: 99365.58, gmPercent: 42 },
    { week: "W25", gmDollars: 146165.37, gmPercent: 43 },
    { week: "W26", gmDollars: 90708.15, gmPercent: 32 },
    { week: "W27", gmDollars: 180504.75, gmPercent: 65 },
    { week: "W28", gmDollars: 139442.48, gmPercent: 46 },
    { week: "W29", gmDollars: 139216.77, gmPercent: 44 },
    { week: "W30", gmDollars: 100489.04, gmPercent: 38 },
    { week: "W31", gmDollars: 152765.66, gmPercent: 48 },
    { week: "W32", gmDollars: 75704.04, gmPercent: 45 },
    { week: "W33", gmDollars: 167605.48, gmPercent: 49 },
    { week: "W34", gmDollars: 79485.96, gmPercent: 34 },
    { week: "W35", gmDollars: 119596.45, gmPercent: 47 },
    { week: "W36", gmDollars: 120675.47, gmPercent: 46 },
    { week: "W37", gmDollars: 97413.66, gmPercent: 38 },
    { week: "W38", gmDollars: 155962.01, gmPercent: 46 },
    { week: "W39", gmDollars: 37571.16, gmPercent: 23 },
    { week: "W40", gmDollars: 121974.94, gmPercent: 50 },
    { week: "W41", gmDollars: 128438.16, gmPercent: 65 },
    { week: "W42", gmDollars: 71208.94, gmPercent: 35 },
    { week: "W43", gmDollars: 128752.29, gmPercent: 44 },
    { week: "W44", gmDollars: 55866.91, gmPercent: 22 },
    { week: "W45", gmDollars: 134230.98, gmPercent: 37 },
    { week: "W46", gmDollars: 146587.86, gmPercent: 52 },
    { week: "W47", gmDollars: 73497.75, gmPercent: 35 },
    { week: "W48", gmDollars: 133371.47, gmPercent: 57 },
    { week: "W49", gmDollars: 73773.56, gmPercent: 33 },
    { week: "W50", gmDollars: 110037.62, gmPercent: 45 },
    { week: "W51", gmDollars: 96149.38, gmPercent: 36 },
    { week: "W52", gmDollars: 138093.51, gmPercent: 56 },
  ];
  

const gmSlice = createSlice({
  name: "gmData",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<GMData>) => {
      state.push(action.payload);
    },
  },
});

export const { addData } = gmSlice.actions;
export default gmSlice.reducer;
