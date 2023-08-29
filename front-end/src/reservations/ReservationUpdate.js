import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationUpdate() {
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
  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    getReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setError);
    return () => abortController.abort();
  }, [reservation_id]);

  console.log("status", reservation);

  function changeHandler({ target: { name, value } }) {
    setReservation((previousReservation) => ({
      ...previousReservation,
      [name]: value,
    }));
  }

  async function submitHandler(event) {
    console.log("🎃");
    event.preventDefault();
    await updateReservation({
      ...reservation,
      people: Number(reservation.people),
    })
      .then((res) => {
        setReservation({ ...res });
        console.log("🎃", res.reservation_date);
        history.push(`/dashboard?date=${res.reservation_date}`);
      })
      //ZXquestions10: how to go back to previous page and previous page needs refreshing?
      .catch(setError);
  }

  return (
    <main>
      <h1 className="mb-3">Edit Existing Reservation</h1>
      <ErrorAlert error={error} />
      <ReservationForm
        reservation={reservation}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </main>
  );
}

export default ReservationUpdate;
