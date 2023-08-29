import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";
import ReservationList from "../reservations/ReservationList";
import TableList from "../tables/TableList";

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
  if (searchDate) {
    date = searchDate;
  }
  useEffect(loadDashboard, [date]);
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }


  const previousDate = previous(date);
  const nextDate = next(date);

  function previousHandler() {
    date = previousDate;
    history.push(`/dashboard?date=${previousDate}`);
    loadDashboard();
  }

  function nextHandler() {
    date = nextDate;
    history.push(`/dashboard?date=${nextDate}`);
    loadDashboard();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {searchDate}</h4>
      </div>
      <ErrorAlert error={reservationsError} />

      <ReservationList reservations={reservations} />
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
      <TableList />
    </main>
  );
}

export default Dashboard;
