import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];

const apiServer = "http://localhost:8001";
const appointmentsUrl = "/api/appointments";
const daysUrl = "/api/days";
const interviewersUrl = "/api/interviewers"

export default function Application(props) {
  // state for selected day
  const [day, setDay] = useState("Monday");
  // state for all available days from server
  const [days, setDays] = useState([]);
  console.log({ days });

  useEffect(() => {
    const url = apiServer + daysUrl;
    console.log("GET ",{url});
    axios.get(url)
    .then((res) => {
      console.log({res});
      const data = res.data;
      console.log("result of GET ", {url}, {data});
      setDays([...data]);
    })
    .catch((err) => {
      console.log("error in GET ",{url}, {err});
    })
  }, []) // [] dependency arr means only once at start/first time

  const appointmentComponents = appointments.map(
    appointment => {
      return  (
      <Appointment
        key={appointment.id}
        // id={appointment.id}
        // time={appointment.time}
        // interview={appointment.interview}
        {...appointment}
      />);
    });

  appointmentComponents.push(<Appointment key="last" time="5pm" />);

  console.log({appointmentComponents});

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
            days={days}
            value={day}
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
