import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ReservationCreate from "../reservations/ReservationCreate";
import TableCreate from "../tables/TableCreate";
import ReservationSeat from "../reservations/ReservationSeat";
import ReservationSearch from "../reservations/ReservationSearch";
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      {/* ZXnotes📝: adding Route to /reservations/new */}
      <Route path="/reservations/new">
        <ReservationCreate />
      </Route>
      {/* ZXnotes📝: adding Route to /tables/new */}
      <Route path="/tables/new">
        <TableCreate />
      </Route>
      {/* ZXnotes📝: adding Route to /reservations/:reservation_id/seat */}
      <Route path="/reservations/:reservation_id/seat">
        <ReservationSeat />
      </Route>
      {/* ZXnotes📝: adding Route to /search*/}
      <Route path="/search">
        <ReservationSearch />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
