import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { seatReservation, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationSeat() {
  const history = useHistory();
  const [option, setOption] = useState({});
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const { reservation_id } = useParams();
  useEffect(loadTables, []);
  function loadTables() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }

  function changeHandler(event) {
    setOption(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const table_id = JSON.parse(option).table_id;
    seatReservation(table_id, reservation_id)
      .then((res) => {
        history.push("/");
      })
      .catch(setError);
  }

  function cancelHandler() {
    history.goBack();
  }

  const freeTables = tables.filter((table) => !table.reservation_id);

  return (
    <main>
      <h1 className="mb-3">Seat Reservation</h1>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler} className="mb-4">
        <div className="row mb-3 col form-group">
          <label className="form-label" htmlForfor="table_id">
            Select a table to seat reservation {reservation_id}
          </label>
          <select
            className="form-control"
            id="table_id"
            name="table_id"
            onChange={changeHandler}
            required={true}
          >
            <option value=""> Table Name - Capacity </option>
            {tables.map((table) => (
              <option value={JSON.stringify(table)} key={table.table_id}>
                {table.table_name} - {table.capacity}
              </option>
            ))}
          </select>
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

export default ReservationSeat;
