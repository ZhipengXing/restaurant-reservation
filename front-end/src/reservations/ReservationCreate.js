//ZXnotes📝: new component for creating a new reservation

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationCreate() {
  const history = useHistory();

  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  const [error, setError] = useState(null);

  function submitHandler(event) {
    event.preventDefault();
    createReservation({ ...reservation, people: Number(reservation.people) })
      .then(() =>
        history.push(`/dashboard?date=${reservation.reservation_date}`)
      )
      .catch(setError);
    console.log("new reservation date", reservation.reservation_date);
  }

  function changeHandler({ target: { name, value } }) {
    setReservation((previousReservation) => ({
      ...previousReservation,
      [name]: value,
    }));
  }
  console.log(typeof reservation.people);
  return (
    <main>
      <h1 className="mb-3">Create New Reservation</h1>
      <ErrorAlert error={error} />
      <ReservationForm
        reservation={reservation}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </main>
  );
}

export default ReservationCreate;
