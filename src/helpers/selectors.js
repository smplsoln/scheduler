export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let appointmentsForDay = [];

  let daysAppointments = [];
  for (const curDay of state.days) {
    if (curDay.name === day) {
      daysAppointments = curDay.appointments;
      break;
    }
  }

  if (!daysAppointments.length) {
    return appointmentsForDay;
  }

  for (const interviewerId of daysAppointments) {
    appointmentsForDay.push(state.appointments[interviewerId]);
  }
  return appointmentsForDay;
}

export function getInterviewersForDay(state, day) {
  let interviewersForDay = [];
  let daysInterviewers = [];

  for (const curDay of state.days) {
    if (curDay.name === day) {
      daysInterviewers = curDay.interviewers;
      break;
    }
  }

  if (!daysInterviewers.length) {
    return interviewersForDay;
  }

  for (const interviewerId of daysInterviewers) {
    interviewersForDay.push(state.interviewers[interviewerId]);
  }
  return interviewersForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  //... returns an array of appointments for that day
  let transformedInterview = {...interview};
  const interviewerObj = state.interviewers[interview.interviewer];
  transformedInterview["interviewer"] = interviewerObj;
  return transformedInterview;
}
