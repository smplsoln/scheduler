import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

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

  const bookInterview = (id, interview) => {
    console.log("Current appointment state: ", state.appointments[id]);
    console.log("Book Interview ", id, interview);
    // create new appointment update obj
    const appointment = {
      ...state.appointments[id],
      interview: {
        ...state.appointments[id].interview,
        ...interview
        // interviewer: interview.interviewer.id
      }
    };
    console.log("Updated appointment state obj: ", appointment);

    // create new updated appointments array
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.put( appointmentsUrl + "/" + appointment.id, appointment)
      .then(res => {
        console.log("Response of appointment PUT: ", res);

        setState((prevState) => ({
          ...prevState,
          appointments: { ...appointments }
        }));
      })
      .catch(err => {
        console.error(err);
    });
    // update the state with new state

  };

  // set day in state
  const setDay = (dayName) => {
    setState((prevState) => {
      return { ...prevState, day: dayName };
    });
  };

  console.log("Days: ", state.days);

  let dailyAppointments = getAppointmentsForDay(state, state.day);
  let daysInterviewers = getInterviewersForDay(state, state.day);
  const appointmentComponents = dailyAppointments.map(
    appointment => {
      console.log("appointment interview in state: ", appointment.interview);
      const interviewObj = getInterview(state, appointment.interview)
      // interviewObj =  interviewObj ? interviewObj : appointment.interview;
      console.log("Appointment", appointment.id, " interviewObj: ", {interviewObj});
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interviewObj}
          interviewers={daysInterviewers}
          bookInterview={bookInterview}
          // {...appointment}
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
