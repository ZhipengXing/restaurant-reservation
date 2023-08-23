import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { freeTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
function TableView({ table }) {
  const history = useHistory();
  // const [currentTable, setCurrentTable] = useState(table);

  const [error, setError] = useState(null); //not needed?
  let text = "Free";
  if (table.reservation_id) {
    text = "Occupied";
  }

  //ZXnotes📝:this may need to be an async function. await will be before callign freeTable

  async function finishHandler(event) {
    const abortController = new AbortController();
    event.preventDefault();
    setError(null);
    const result = window.confirm(
      "Is this table ready to seat new guests?" +
        "\n" +
        "\n" +
        "This cannot be undone"
    );


    if (result) {
      freeTable(table.table_id, abortController.signal)
        .then(() => history.push("/"))
        .catch(setError);
    }
  }

  return (
    <>
      <ErrorAlert error={error} />
      <tr key={table.table_id}>
        <th scope="row">{table.table_id}</th>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        {/* //ZXquestions06: what does data-table-id-status mean? */}
        <td data-table-id-status={`${table.table_id}`}>{text}</td>
        <td>{table.reservation_id}</td>
        {/* add Finish button */}
        <td>
          {table.reservation_id ? (
            <button
              className="btn btn-danger"
              data-table-id-finish={`${table.table_id}`}
              onClick={finishHandler}
            >
              Finish
            </button>
          ) : (
            <></>
          )}
        </td>
      </tr>
    </>
  );
}

export default TableView;
