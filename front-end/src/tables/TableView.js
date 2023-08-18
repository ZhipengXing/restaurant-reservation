import React from "react";

function TableView({ table }) {
  let text = "Free";
  if (table.reservation_id) {
    text = "Occupied";
  }
  return (
    <tr key={table.table_id}>
      <th scope="row">{table.table_id}</th>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      {/* //ZXquestions06: what does data-table-id-status mean? */}
      <td data-table-id-status={`${table.table_id}`}>{text}</td>
      <td>{table.reservation_id}</td>
    </tr>
  );
}

export default TableView;
