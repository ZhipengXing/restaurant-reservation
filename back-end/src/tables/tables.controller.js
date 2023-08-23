//ZXnotes📝:controller file for tables

const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { as } = require("../db/connection");

//ZXnotes📝: validate there is input data
function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "body must have data property" });
}

//ZXnotes📝: validate there is input data for each property
function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({
      status: 400,
      message: `table must include a ${propertyName}.`,
    });
  };
}

//ZXnotes📝: validate table name is more than 1 character
function tableNameIsValid(req, res, next) {
  const name = req.body.data.table_name;
  if (name.split(" ").join("").length > 1) {
    return next();
  }
  next({
    status: 400,
    message: "table_name must be at least 2 characters long",
  });
}

//ZXnotes📝: validate table capacity is at least 1 and a number
//ZXquestions08:capacity becomes a string, how to validate input is number
function tableCapacityIsValid(req, res, next) {
  const capacity = req.body.data.capacity;
  if (capacity >= 1) {
    //&& typeof capacity === "number"
    return next();
  }
  next({
    status: 400,
    message: "capacity must be at least 1",
  });
}

//ZXnotes📝:to validate table exists
async function tableExists(req, res, next) {
  const table = await service.readTable(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: `table ${req.params.table_id} does not exist` });
}

//ZXnotes📝:to validate reservation exists
async function reservationExists(req, res, next) {
  const reservation = await service.readReservation(
    req.body.data.reservation_id
  );
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `reservation ${req.body.data.reservation_id} does not exist`,
  });
}

//ZXnotes📝:to validate reservation people number is less than table capacity

async function enoughCapacity(req, res, next) {
  const { table, reservation } = res.locals;
  if (reservation.people <= table.capacity) {
    return next();
  }
  next({
    status: 400,
    message: "this table does not have sufficient capacity",
  });
}

//ZXnotes📝:to validate table is free
function tableIsFree(req, res, next) {
  const { table } = res.locals;
  if (!table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table ${table.table_name} is currently occupied`,
  });
}

//ZXnotes📝:to validate table is currently occupied
function tableIsOccupied(req, res, next) {
  const { table } = res.locals;
  if (table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table ${table.table_name} is not occupied`,
  });
}

//ZXnotes📝:to list all tables
async function list(req, res) {
  const allData = await service.list();
  const data = allData.sort((a, b) => (a.table_name < b.table_name ? -1 : 1));
  res.json({ data });
}

async function create(req, res) {
  const newTable = await service.create(req.body.data);
  res.status(201).json({ data: newTable });
}

//ZXnotes📝:to assign table to reservation
async function update(req, res) {
  const { table, reservation } = res.locals;
  const data = await service.update(reservation.reservation_id, table.table_id);
  res.json({ data });
}

//ZXnotes📝:to free up a table
async function destroyReservation(req, res) {
  const table = res.locals.table;
  await service.destroy(table.table_id, table.reservation_id);
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasData,
    bodyDataHas("table_name"),
    bodyDataHas("capacity"),
    tableNameIsValid,
    tableCapacityIsValid,
    asyncErrorBoundary(create),
  ],

  update: [
    hasData,
    bodyDataHas("reservation_id"),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(enoughCapacity),
    tableIsFree,
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(tableExists),
    tableIsOccupied,
    asyncErrorBoundary(destroyReservation),
  ],
};
