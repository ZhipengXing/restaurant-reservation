import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ reservation, changeHandler, submitHandler }) {
  const history = useHistory();

  function cancelHandler() {
    history.goBack();
  }

  return (
    <>
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
              id="reservation_date"
              name="reservation_date"
              type="date"
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              value={reservation.reservation_date}
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
              id="reservation_time"
              name="reservation_time"
              type="time"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              value={reservation.reservation_time}
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
              min="2"
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
    </>
  );
}

export default ReservationForm;
