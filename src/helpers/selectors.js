export function getAppointmentsForDay(state, day) {
  if (!state.days) {
    return [];
  } else {
    const filterDays = state.days.filter(days => days.name === day);

    if (filterDays.length === 0) {
      return filterDays;
    } else {
      let appointments = [];
      for (const day in state.appointments) {
        for (const id of filterDays[0].appointments) {
          if (id === Number(day)) {
            appointments.push(state.appointments[`${id}`]);
          }
        }
      }
      return appointments;
    }
  }
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const result = {};
  result.student = interview.student;
  result.interviewer = state.interviewers[interview.interviewer];

  return result;
}