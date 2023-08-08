//ZXnotes📝: new component for creating a new reservation

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

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

  function cancelHandler() {
    history.push("/");
  }

  function submitHandler(event) {
    event.preventDefault();
    createReservation(reservation).then(() => {
      console.log("date", reservation.time);
      history.push("/");
    });
  }

  function changeHandler({ target: { name, value } }) {
    setReservation((previousReservation) => ({
      ...previousReservation,
      [name]: value,
    }));
  }

  return (
    <main>
      <h1 className="mb-3">Create New Reservation</h1>
      <form onSubmit={submitHandler} className="mb-4">
        <div className="row mb-3">
          <div className="col form-group">
            <label className="form-label" htmlFor="firstName">
              First Name
            </label>
            <input
              className="form-control"
              id="first_name"
              name="first_name"
              type="text"
              value={reservation.first_name}
              onChange={changeHandler}
              required={true}
            />
          </div>
          <div className="col form-group">
            <label className="form-label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="form-control"
              id="last_name"
              name="last_name"
              type="text"
              value={reservation.last_name}
              onChange={changeHandler}
              required={true}
            />
          </div>
          <div className="col form-group">
            <label className="form-label" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <input
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="XXX-XXX-XXXX"
              value={reservation.mobile_number}
              onChange={changeHandler}
              required={true}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col form-group">
            <label className="form-label" htmlFor="date">
              Date
            </label>
            <input
              className="form-control"
              id="date"
              name="date"
              type="date"
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              value={reservation.date}
              onChange={changeHandler}
              required={true}
            />
          </div>
          <div className="col form-group">
            <label className="form-label" htmlFor="time">
              Time
            </label>
            <input
              className="form-control"
              id="time"
              name="time"
              type="time"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              value={reservation.time}
              onChange={changeHandler}
              required={true}
            />
          </div>
          <div className="col form-group">
            <label className="form-label" htmlFor="people">
              Number of People
            </label>
            <input
              className="form-control"
              id="people"
              name="people"
              type="number"
              value={reservation.people}
              onChange={changeHandler}
              required={true}
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}

export default ReservationCreate;
