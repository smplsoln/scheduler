import React from "react";
// import { useState } from "react";
// import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  console.log({ state });
  console.log("Days: ", state.days);

  let dailyAppointments = getAppointmentsForDay(state, state.day);

  let daysInterviewers = getInterviewersForDay(state, state.day);

  const appointmentComponents = dailyAppointments.map(
    appointment => {
      console.log("appointment interview in state: ", appointment.interview);
      const interviewObj = getInterview(state, appointment.interview)
      console.log("Appointment", appointment.id, " interviewObj: ", {interviewObj});
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interviewObj}
          interviewers={daysInterviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />);
    });
  appointmentComponents.push(<Appointment key="last" time="5pm" />);
  console.log({ appointmentComponents });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentComponents}
      </section>
    </main>
  );
}
