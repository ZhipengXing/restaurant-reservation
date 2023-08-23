import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { freeTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
function TableView({ table, finishHandler }) {
  const [error, setError] = useState(null); //not needed?
  let text = "Free";
  if (table.reservation_id) {
    text = "Occupied";
  }

  return (
    <>
      <ErrorAlert error={error} />
      <tr key={table.table_id}>
        <th scope="row">{table.table_id}</th>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        {/* //ZXquestions06: what does data-table-id-status mean? */}
        <td data-table-id-status={table.table_id}>{text}</td>
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
