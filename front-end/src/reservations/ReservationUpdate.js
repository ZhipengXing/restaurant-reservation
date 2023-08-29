import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationUpdate() {
  const history = useHistory();
  const [reservation, setReservation] = useState({});
  const [error, setError] = useState(null);
  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    getReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setError);
    return () => abortController.abort();
  }, [reservation_id]);


  function changeHandler({ target: { name, value } }) {
    setReservation((previousReservation) => ({
      ...previousReservation,
      [name]: value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    await updateReservation({
      ...reservation,
      people: Number(reservation.people),
    })
      .then((res) => {
        setReservation({ ...res });
        history.push(`/dashboard?date=${res.reservation_date}`);
      })
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
