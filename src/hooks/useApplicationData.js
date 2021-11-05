import { useState, useEffect } from "react";
import axios from "axios";


const useApplicationData = () => {
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

  const apiServer = "http://localhost:8001";
  const daysUrl = apiServer + "/api/days";
  const appointmentsUrl = apiServer + "/api/appointments";
  const interviewersUrl = apiServer + "/api/interviewers";

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

    // update the interview in the appointment
    // in backend using appointments PUT api
    return axios.put( appointmentsUrl + "/" + appointment.id, appointment)
      .then(res => {
        console.log("Response of appointment PUT: ", res);

        // update the state with new state
        setState((prevState) => ({
          ...prevState,
          appointments: { ...appointments }
        }));
      })
      .catch(err => {
        console.error(err);
        throw err;
    });
  };

  const cancelInterview = (id) => {
    console.log("Current appointment state: ", state.appointments[id]);
    console.log("Cancel interview in appointment", id);
    // delete interview in appointment object
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    console.log("Appointment state obj after interview delete: ", appointment);

    // create new updated appointments array
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // update the interview in the appointment
    // in backend using appointments DELETE api
    return axios.delete( appointmentsUrl + "/" + appointment.id)
      .then(res => {
        console.log("Response of appointment's interview DELETE: ", res);

        // update the state with new state
        setState((prevState) => ({
          ...prevState,
          appointments: { ...appointments }
        }));
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
  };

  // set day in state
  const setDay = (dayName) => {
    setState((prevState) => {
      return { ...prevState, day: dayName };
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}

export default useApplicationData;