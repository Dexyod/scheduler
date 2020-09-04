import { useEffect, useReducer } from 'react';
import axios from 'axios';

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "../reducers/application";

require("dotenv").config();

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //All Promises
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
      .catch(err => console.log(err));

    //web socket
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)

    webSocket.onmessage = function (event) {
      // console.log(event.data);
      event = JSON.parse(event.data);

      try {
        event.type === SET_INTERVIEW && dispatch({ ...event });
      } catch (error) {
        console.log({ error, event })
      }

    };
  }, []);

  //set day function
  const setDay = day => dispatch({ type: SET_DAY, day });

  //Booking an interview
  function bookInterview(id, interview) {

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview })
      })
      .catch(err => { throw err });
  }

  //Cancelling Interview
  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id });
      })
      .catch(err => { throw err });
  }



  return { state, setDay, bookInterview, cancelInterview }
}