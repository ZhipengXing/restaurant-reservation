const knex = require("../db/connection");

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((rows) => rows[0]);
}

function listByDate(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_date")
    .orderBy("reservation_time");
}

function listByNumber(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date")
    .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

async function updateStatus(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status: status }, "*");
}

async function updateReservation(updatedReservation) {
  return knex("reservations")
    .where({
      reservation_id: updatedReservation.reservation_id,
    })
    .update(updatedReservation, "*")
    .then((rows) => rows[0]);
}

module.exports = {
  create,
  listByDate,
  listByNumber,
  read,
  updateStatus,
  updateReservation,
};
