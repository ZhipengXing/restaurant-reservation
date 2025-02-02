import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TableCreate() {
  const history = useHistory();

  const [table, setTable] = useState({
    table_name: "",
    capacity: "",
  });

  const [error, setError] = useState(null);

  function cancelHandler() {
    history.goBack();
  }

  function submitHandler(event) {
    event.preventDefault();
    createTable({ ...table, capacity: Number(table.capacity) })
      .then(() => history.push("/"))
      .catch(setError);
  }

  function changeHandler({ target: { name, value } }) {
    setTable((previousTable) => ({
      ...previousTable,
      [name]: value,
    }));
  }

  return (
    <main>
      <h1 className="mb-3">Create New Table</h1>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler} className="mb-4">
        <div className="row mb-3">
          <div className="col form-group">
            <label className="form-label" htmlFor="tableName">
              Table Name
            </label>
            <input
              className="form-control"
              id="table_name"
              name="table_name"
              type="text"
              minLength={2}
              value={table.table_name}
              onChange={changeHandler}
              required={true}
            />
          </div>
          <div className="col form-group">
            <label className="form-label" htmlFor="capacity">
              Table Capacity
            </label>
            <input
              className="form-control"
              id="capacity"
              name="capacity"
              type="number"
              min="1"
              value={table.capacity}
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

export default TableCreate;
