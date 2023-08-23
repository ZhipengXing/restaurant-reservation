import React from "react";
import TableView from "./TableView";

function TableList({ tables }) {
  return (
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
            <TableView key={index} table={table} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableList;
