const knex = require("../db/connection");

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((rows) => rows[0]);
}

function list() {
  return knex("reservations").select("*");
}

module.exports = {
  create,
  list,
};
