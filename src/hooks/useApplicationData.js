import { useEffect, useState } from 'react';
import axios from 'axios';


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => {
    setState({ ...state, day })
  };

  //Update spots
  const updateSpots = function (state, decrease) {
    return state.days.map(day => {
      if (day.name !== state.day) {
        return day;
      }

      return {
        ...day,
        spots: decrease ? day.spots-- : day.spots++
      };
    });
  };

  //All Promises
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
      .catch(err => console.log(err));
  }, []);

  //Booking an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        updateSpots(state, true);
        setState({ ...state, appointments })
      });
  }

  //Cancelling Interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        updateSpots(state, false);
        setState({ ...state, appointments });

      })

  }

  return { state, setDay, bookInterview, cancelInterview }
}