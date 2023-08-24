//ZXnotes📝: new component for searching a reservation
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservationsWithNumber } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "./ReservationList";

function ReservationSearch() {
  const [number, setNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();

  async function submitHandler(event) {
    event.preventDefault();
    setReservations([]);
    setError(null);
    const abortController = new AbortController();
    try {
      const response = await listReservationsWithNumber(
        number,
        abortController.signal
      );
      //   if (response.length === 0) {
      //     setError({ message: "No reservations found" });
      //   }
      setReservations(response);
    } catch (error) {
      setError(error);
    }
  }

  function changeHandler(event) {
    setNumber(event.target.value);
  }
  return (
    <main>
      <h1 className="mb-3">Search Reservation</h1>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler} className="mb-4">
        <div className="row mb-3">
          <div className="col form-group">
            {/* <label className="form-lable" htmlFor="mobileNumber"></label> */}
            <input
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              type="tel"
              placeholder=" Enter a customer's phone number"
              value={number}
              onChange={changeHandler}
              required={true}
            ></input>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Find
        </button>
      </form>
      <br />
      {reservations && reservations.length !== 0 ? (
        <ReservationList reservations={reservations} />
      ) : (
        <>No reservations found</>
      )}
    </main>
  );
}

export default ReservationSearch;
