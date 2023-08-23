import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listTables, freeTable } from "../utils/api";

import ErrorAlert from "../layout/ErrorAlert";

import TableView from "./TableView";

function TableList() {
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadTables, []);
  async function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    try {
      const updatedTables = await listTables(abortController.signal);
      setTables(updatedTables);
    } catch (error) {
      setTablesError(error);
    }

    return () => abortController.abort();
  }

  async function finishHandler(id) {
    const abortController = new AbortController();

    setTablesError(null);
    const result = window.confirm(
      "Is this table ready to seat new guests?" +
        "\n" +
        "\n" +
        "This cannot be undone"
    );

    if (result) {
      try {
        await freeTable(id, abortController.signal);
        //ZXnotes📝: this line is not needed since we need to reload reservation tables too
        // await loadTables();
        history.push("/");
      } catch (error) {
        setTablesError(error);
      }
    }
  }

  return (
    <>
      <div className="d-md-flex mb-3 mt-3">
        <h4 className="mb-0">Tables</h4>
        <ErrorAlert error={tablesError} />
      </div>
      <div className="table-list">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Table Name</th>
              <th scope="col">Capacity</th>
              <th scope="col">Status</th>
              <th scope="col">Assigned Reservation</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table, index) => (
              <TableView
                key={index}
                table={table}
                finishHandler={() => finishHandler(table.table_id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableList;
