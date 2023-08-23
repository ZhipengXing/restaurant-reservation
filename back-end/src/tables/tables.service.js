const knex = require("../db/connection");
//ZXnotes📝:add read function to get table information
function readTable(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

//ZXnotes📝:add read function to get reservation information
function readReservation(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((rows) => rows[0]);
}

function list() {
  return knex("tables").select("*");
}

async function update(reservation_id, table_id) {
  const trx = await knex.transaction();
  return trx("tables")
    .where({ table_id })
    .update({ reservation_id: reservation_id, status: "Occupied" }, "*")
    .then(() =>
      trx("reservations")
        .where({ reservation_id })
        .update({ status: "seated" }, "*")
    )
    .then(trx.commit)
    .catch(trx.rollback);
}

async function destroyReservation(reservation_id, table_id) {
  const trx = await knex.transaction();
  return trx("tables")
    .where({ table_id })
    .update({ reservation_id: null, status: "Free" }, "*")
    .then(() =>
      trx("reservations")
        .where({ reservation_id })
        .update({ status: "finished" }, "*")
    )
    .then(trx.commit)
    .catch(trx.rollback);
}

module.exports = {
  create,
  list,
  update,
  readTable,
  readReservation,
  destroy: destroyReservation,
};
