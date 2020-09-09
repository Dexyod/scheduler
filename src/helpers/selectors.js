export function getAppointmentsForDay(state, day) {
  //find day that is selected
  const selectedDay = state.days.find(item => item.name === day);
  if (state.days.length === 0 || selectedDay === undefined) {
    return []
  }
  //get appointments from the selected day
  const returnedArray = selectedDay.appointments.map(id => state.appointments[id])
  return returnedArray;
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


export function getInterviewersForDay(state, day) {
  //find day that is selected
  const selectedDay = state.days.find(item => item.name === day);
  if (state.days.length === 0 || selectedDay === undefined) {
    return []
  }
  //get interviewers from the selected day
  const returnedArray = selectedDay.interviewers.map(id => state.interviewers[id])
  return returnedArray;
}