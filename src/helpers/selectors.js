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

  for (const apoId of daysAppointments) {
    appointmentsForDay.push(state.appointments[apoId]);
  }
  return appointmentsForDay;
}