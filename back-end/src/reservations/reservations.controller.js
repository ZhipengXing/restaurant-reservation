/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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
      message: `reservation must include a ${propertyName}.`,
    });
  };
}

//ZXnotes📝: validate date input is a date
function dateValidation(req, res, next) {
  const date = req.body.data.reservation_date;
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) {
    return next({
      status: 400,
      message: `reservation_date must be a date in YYYY-MM-DD format`,
    });
  }
  next();
}

//ZXnotes📝: validate time input is a time
function timeValidation(req, res, next) {
  const time = req.body.data.reservation_time;
  const regEx = /^\d{2}:\d{2}$/;
  if (!time.match(regEx)) {
    return next({
      status: 400,
      message: `reservation_time must be a date in HH:MM format`,
    });
  }
  next();
}

//ZXnotes📝: validate the number of people is at least 1 and it is a number
function peopleValidation(req, res, next) {
  const people = req.body.data.people;
  if (typeof people == "number" && people >= 1) {
    //
    return next();
  }
  next({ status: 400, message: "Number of people must be more than 1" });
}

//ZXnotes📝: validate the date is a future date and not a Tuesday
function dateIsValid(req, res, next) {
  const date = req.body.data.reservation_date;
  const today = new Date().toLocaleDateString("fr-CA");
  const day = new Date(date);
  const dayOfTheWeek = day.getDay() + 1;
  if (date >= today && dayOfTheWeek != 2) {
    return next();
  } else if (date >= today && dayOfTheWeek === 2) {
    return next({ status: 400, message: "Sorry, we are closed on Tuesdays" });
  } else if (date < today && dayOfTheWeek != 2) {
    return next({
      status: 400,
      message: "Reservation date must be in the future",
    });
  } else if (date < today && dayOfTheWeek === 2) {
    return next({
      status: 400,
      message:
        "Reservation date must be in the future & we are closed on Tuesdays",
    });
  }
}
function dateIsNotTuesday(req, res, next) {
  const date = req.body.data.reservation_date;
  const day = new Date(date);
  const dayOfTheWeek = day.getDay() + 1;
  if (dayOfTheWeek === 2) {
    return next({ status: 400, message: "Sorry, we are closed on Tuesdays" });
  }
  next();
}

//ZXnotes📝: validate the time is valid

function timeIsValid(req, res, next) {
  const time = req.body.data.reservation_time;
  const date = req.body.data.reservation_date;
  const today = new Date().toLocaleDateString("fr-CA");
  const timeNow = new Date().getHours() + ":" + new Date().getMinutes();
  if (time < "10:30" || time > "21:30") {
    return next({
      status: 400,
      message: "Please only reserve time between 10:30AM and 9:30PM",
    });
  } else if (
    date === today &&
    Number(time.replace(":", "")) <= Number(timeNow.replace(":", ""))
  ) {
    return next({
      status: 400,
      message: "Reservation must be in the future",
    });
  }
  next();
}

//ZXnotes📝: validate reservation exists
async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `reservation ${req.params.reservation_id} does not exist`,
  });
}

//ZXnotes📝: validate reservation is not finished
function reservationNotFinished(req, res, next) {
  const reservation = res.locals.reservation;
  if (reservation.status === "finished") {
    next({
      status: 400,
      message: `reservation cannot already be finished`,
    });
  }
  next();
}

//ZXnotes📝: validate reservation status is booked
function reservationBooked(req, res, next) {
  const reservation = res.locals.reservation;
  if (reservation.status !== "booked") {
    next({
      status: 400,
      message: `only booked reservation can be edited`,
    });
  }
  next();
}

//ZXnotes📝: validate reservation status input is either fnished or seated
function unknownStatusValidation(req, res, next) {
  const status = req.body.data.status;
  if (
    status !== "finished" &&
    status !== "seated" &&
    status !== "booked" &&
    status !== "cancelled"
  ) {
    next({
      status: 400,
      message: `unknown reservation status`,
    });
  }
  next();
}

//ZXnotes📝: validate new reservation status can only be "booked"
function newReservationStatusValidation(req, res, next) {
  const status = req.body.data.status;
  if (status && status !== "booked") {
    next({
      status: 400,
      message: `new reservation status can not be "finished" or "seated"`,
    });
  }
  next();
}

async function create(req, res) {
  const newReservation = await service.create(req.body.data);
  res.status(201).json({ data: newReservation });
}

async function list(req, res) {
  let { date, mobile_number } = req.query;
  let data = null;

  if (mobile_number) {
    data = await service.listByNumber(mobile_number);
    res.json({
      data,
    });
  }

  const alldata = await service.listByDate(
    date || new Date().toJSON().slice(0, 10)
  );
  data = alldata.filter(
    (reservation) =>
      reservation.status === "booked" || reservation.status === "seated"
  );

  res.json({
    data,
  });
}

function read(req, res) {
  const data = res.locals.reservation;
  res.json({ data });
}

//ZXnotes📝: update reservation status
async function updateStatus(req, res) {
  const reservation = res.locals.reservation;
  const status = req.body.data.status;
  const data = await service.updateStatus(reservation.reservation_id, status);
  res.status(200).json({ data: { status: data[0].status } });
}

//ZXnotes📝: update reservation
async function updateReservation(req, res) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await service.updateReservation(updatedReservation);
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    hasData,
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    dateValidation,
    timeValidation,
    peopleValidation,
    dateIsValid,
    dateIsNotTuesday,
    timeIsValid,
    newReservationStatusValidation,
    asyncErrorBoundary(create),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    reservationNotFinished,
    unknownStatusValidation,
    asyncErrorBoundary(updateStatus),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    reservationBooked,
    hasData,
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    dateValidation,
    timeValidation,
    peopleValidation,
    dateIsValid,
    dateIsNotTuesday,
    timeIsValid,
    newReservationStatusValidation,
    asyncErrorBoundary(updateReservation),
  ],
};
