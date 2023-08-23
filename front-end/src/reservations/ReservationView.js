//ZXnotes📝: reservation view as a separate component

import React from "react";

// function ReservationView({ reservation }) {
//   if (reservation.status !== "finished") {
//     return (
//       <>
//         <tr key={reservation.reservation_id}>
//           <th scope="row">{reservation.reservation_id}</th>
//           <td>{reservation.first_name}</td>
//           <td>{reservation.last_name}</td>
//           <td>{reservation.mobile_number}</td>
//           <td>{reservation.reservation_time}</td>
//           <td>{reservation.reservation_date}</td>
//           <td>{reservation.people}</td>
//           <td data-reservation-id-status={reservation.reservation_id}>
//             {reservation.status}
//           </td>
//           <td>
//             {" "}
//             {reservation.status === "booked" ? (
//               <a href={`/reservations/${reservation.reservation_id}/seat`}>
//                 <button className="btn btn-primary">Seat</button>
//               </a>
//             ) : (
//               <div></div>
//             )}
//           </td>
//         </tr>
//       </>
//     );
//   }

//   return <></>;
// }

function ReservationView({ reservation }) {
  return (
    <>
      <tr key={reservation.reservation_id}>
        <th scope="row">{reservation.reservation_id}</th>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </td>
        <td>
          {" "}
          {reservation.status === "booked" ? (
            <a href={`/reservations/${reservation.reservation_id}/seat`}>
              <button className="btn btn-primary">Seat</button>
            </a>
          ) : (
            <div></div>
          )}
        </td>
      </tr>
    </>
  );
}

export default ReservationView;
