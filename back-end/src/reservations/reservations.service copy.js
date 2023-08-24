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

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

async function updateStatus(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status: status }, "*");
}

module.exports = {
  create,
  list,
  read,
  updateStatus,
};
