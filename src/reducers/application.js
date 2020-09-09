export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

//reducer
export default function reducer(state, action) {
  //create switch case for each action.type
  switch (action.type) {
    case SET_DAY: {
      return { ...state, day: action.day };
    }
    case SET_APPLICATION_DATA: {
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    }
    case SET_INTERVIEW: {
      //copy all appointments
      const newInterview = state["appointments"];

      //get array of days with updated spots
      const daysArray = state.days.map(day => {

        for (let appointment of day.appointments) {
          if (action.id === appointment) {
            //if interview was added -1 spot or add 1 if deleted
            if (action.interview && !state.appointments[action.id].interview) {
              return { ...day, spots: day.spots - 1 };
            } else if (
              !action.interview &&
              state.appointments[action.id].interview
            ) {
              return { ...day, spots: day.spots + 1 };
            }
          }
        }
        return day;
      });

      newInterview[action.id]["interview"] = action.interview;

      return { ...state, appointments: newInterview, days: daysArray };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}