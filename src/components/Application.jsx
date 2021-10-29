import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

const apiServer = "http://localhost:8001";
const daysUrl = apiServer + "/api/days";
const appointmentsUrl = apiServer + "/api/appointments";
const interviewersUrl = apiServer + "/api/interviewers"

export default function Application(props) {

  // combined state for day, days, appointments
  const [state, setState] = useState(
    {
      // state for selected day
      day: "Monday",
      // state for all available days from server
      days: [],
      // state for all appointments
      appointments: {}
    }
  );
  console.log({ state });

  useEffect(() => {
    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl),
    ])
    .then((all) => {
      console.log("GET all results: ", { all });
      setState((prevState) => ({
        ...prevState,
        days: [...all[0].data],
        appointments: { ...all[1].data },
        interviewers: { ...all[2].data }
      }));
    })
    // [] dependency arr for running this
    // only once at start/first time
  }, []);

  let dailyAppointments = [];

  // set day in state
  const setDay = (dayName) => {
    setState((prevState) => {
      return { ...prevState, day: dayName };
    });
  };

  console.log("Days: ", state.days);

  dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentComponents = dailyAppointments.map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          // id={appointment.id}
          // time={appointment.time}
          // interview={appointment.interview}
          {...appointment}
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
