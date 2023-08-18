//ZXnotes📝:router file for tables

const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/:table_id([0-9]+)/seat")

  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;
