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

  console.log("reservation🎃 ", reservation);

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
        console.log("🎃", res.reservation_date);
        history.push(`/dashboard?date=${res.reservation_date}`);
      })
      //ZXquestions10: how to go back to previous page and previous page needs refreshing?
      .catch(setError);
  }

  // async function submitHandler(event) {
  //   console.log("🎃");
  //   event.preventDefault();
  //   try {
  //     const res = await updateReservation({
  //       ...reservation,
  //       people: Number(reservation.people),
  //     });
  //     setReservation({ ...res });
  //     console.log("res🎃", res);
  //     history.push(`/dashboard?date=${res.reservation_date}`);
  //   } catch (error) {
  //     console.log("error🎃", error);
  //     setError(error);
  //   }
  // }

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
