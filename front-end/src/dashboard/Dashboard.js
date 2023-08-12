import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import reactRouterDom from "react-router-dom";
import { previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  let searchDate = new URLSearchParams(document.location.search).get("date");
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  if (!searchDate) {
    searchDate = date;
  }

  const selectedReservations = reservations.filter(
    (reservation) => reservation.reservation_date === searchDate
  );
  console.log("searchDate", searchDate);
  console.log("selected", selectedReservations);
  console.log(reservations);

  //ZXnotes📝: add function to sort by time, earliest first
  const sortedReservations = selectedReservations.sort((a, b) =>
    a.reservation_time < b.reservation_time ? -1 : 1
  );

  console.log("searchDate", searchDate);
  const previousDate = previous(searchDate);
  const nextDate = next(searchDate);
  console.log("previous and next", previousDate, nextDate);

  function previousHandler() {
    history.push(`/dashboard?date=${previousDate}`);
    loadDashboard();
  }

  function nextHandler() {
    history.push(`/dashboard?date=${nextDate}`);
    loadDashboard();
  }

  //ZXnotes📝: add function to map observations into table format
  const tableRows = sortedReservations.map((reservation) => (
    <tr key={reservation.reservation_id}>
      <th scope="row">{reservation.reservation_id}</th>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
    </tr>
  ));

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {searchDate}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Time</th>
            <th scope="col">Number of People</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <div className="buttonGroup">
        <button
          type="button"
          className="btn btn-primary"
          onClick={previousHandler}
        >
          Previous
        </button>

        <button type="button" className="btn btn-primary" onClick={nextHandler}>
          Next
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => history.push("/")}
        >
          Today
        </button>
      </div>
    </main>
  );
}

// ZXquestions04: trying to set date from backend but not working
// function Dashboard({ date }) {
//   const [reservations, setReservations] = useState([]);
//   const [reservationsError, setReservationsError] = useState(null);
//   const searchDate = new URLSearchParams(document.location.search).get("date");
//   console.log("searchDate", searchDate);
//   useEffect(loadDashboard, [date]);

//   function loadDashboard() {
//     const abortController = new AbortController();
//     setReservationsError(null);
//     listReservations({ date }, abortController.signal)
//       .then(setReservations)
//       .catch(setReservationsError);
//     return () => abortController.abort();
//   }
//   console.log(reservations);

//   //ZXnotes📝: add function to sort by time, earliest first
//   const sortedReservations = reservations.sort((a, b) =>
//     a.reservation_time < b.reservation_time ? -1 : 1
//   );

//   console.log(date);
//   //ZXnotes📝: add function to map observations into table format
//   const tableRows = sortedReservations.map((reservation) => (
//     <tr key={reservation.reservation_id}>
//       <th scope="row">{reservation.reservation_id}</th>
//       <td>{reservation.first_name}</td>
//       <td>{reservation.last_name}</td>
//       <td>{reservation.mobile_number}</td>
//       <td>{reservation.reservation_time}</td>
//       <td>{reservation.people}</td>
//     </tr>
//   ));

//   return (
//     <main>
//       <h1>Dashboard</h1>
//       <div className="d-md-flex mb-3">
//         <h4 className="mb-0">Reservations for {searchDate}</h4>
//       </div>
//       <ErrorAlert error={reservationsError} />
//       {/* {JSON.stringify(reservations)} */}
//       <table className="table">
//         <thead>
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">First Name</th>
//             <th scope="col">Last Name</th>
//             <th scope="col">Mobile Number</th>
//             <th scope="col">Time</th>
//             <th scope="col">Number of People</th>
//           </tr>
//         </thead>
//         <tbody>{tableRows}</tbody>
//       </table>
//     </main>
//   );
// }

export default Dashboard;
