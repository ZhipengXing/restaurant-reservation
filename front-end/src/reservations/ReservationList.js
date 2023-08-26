//ZXnotes📝: reservationlist as a separate component
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations, cancelReservation } from "../utils/api";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationView from "./ReservationView";

function ReservationList({ reservations }) {
  const history = useHistory();
  const [error, setError] = useState(null);
  async function cancelHandler(id) {
    const abortController = new AbortController();
    setError(null);
    const result = window.confirm(
      "Do you want to cancel this reservation?" +
        "\n" +
        "\n" +
        "This cannot be undone"
    );
    if (result) {
      try {
        await cancelReservation(id, abortController.signal);
        // loadDashboard();
        history.push("/");
      } catch (error) {
        setError(error);
      }
    }
  }

  return (
    <>
      <ErrorAlert error={error} />

      <div className="reservation-list">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Time</th>
              <th scope="col">Date</th>
              <th scope="col">Number of People</th>
              <th scope="col">Status</th>
              <th scope="col">Seat</th>
              <th scope="col">Edit</th>
              <th scope="col">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <ReservationView
                key={index}
                reservation={reservation}
                cancelHandler={() => cancelHandler(reservation.reservation_id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ReservationList;
