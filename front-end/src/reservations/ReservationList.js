//ZXnotes📝: reservationlist as a separate component
import React from "react";
import ReservationView from "./ReservationView";

function ReservationList({ reservations }) {
  return (
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
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <ReservationView key={index} reservation={reservation} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationList;
