const knex = require("../db/connection");

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((rows) => rows[0]);
}

function list() {
  return knex("tables").select("*");
}

module.exports = {
  create,
  list,
};
