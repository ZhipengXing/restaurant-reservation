/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//ZXnotes📝: validate the number of people is at least 1
function atLeastOne(req, res, next) {
  const people = req.body.data.people;
  if (people >= 1) {
    return next();
  }
  next({ status: 400, message: "Number of People must be more than 1" });
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
    return next({ status: 400, message: "Sorry, we are not open on Tuesdays" });
  } else if (date < today && dayOfTheWeek != 2) {
    return next({
      status: 400,
      message: "Reservation date must be in the future",
    });
  } else if (date < today && dayOfTheWeek === 2) {
    return next({
      status: 400,
      message:
        "Reservation date must be in the future & we are not open on Tuesdays",
    });
  }
}
//ZXquestions05:need to add 1 so the day works?
function dateIsNotTuesday(req, res, next) {
  const date = req.body.data.reservation_date;
  const day = new Date(date);
  const dayOfTheWeek = day.getDay() + 1;
  console.log(dayOfTheWeek);
  if (dayOfTheWeek === 2) {
    return next({ status: 400, message: "Sorry, we are not open on Tuesdays" });
  }
  next();
}

//ZXnotes📝: validate the time is valid

function timeIsValid(req, res, next) {
  const time = req.body.data.reservation_time;
  const date = req.body.data.reservation_date;
  const today = new Date().toLocaleDateString("fr-CA");
  const timeNow = new Date().getHours() + ":" + new Date().getMinutes();
  console.log("time and timeNow", time, timeNow);
  if (time < "10:30" || time > "21:30") {
    return next({
      status: 400,
      message: "Please only reserve time between 10:30AM and 9:30PM",
    });
  } else if (date === today && time <= timeNow) {
    return next({
      status: 400,
      message: "Reservation must be in the future",
    });
  }
  next();
}

async function create(req, res) {
  const newReservation = await service.create(req.body.data);
  res.status(201).json({
    data: newReservation,
  });
}
//ZXquestions04: trying to do this at backend but frontend is not getting the right result
// async function list(req, res) {
//   let date = req.query.date;
//   const data = await service.list();
//   //ZXnotes📝: API will only select reservations for the queried date
//   if (!date) {
//     date = new Date().toJSON().slice(0, 10);
//   }
//   console.log("date", date);
//   const selectedData = data.filter(
//     (reservation) => reservation.reservation_date === date
//   );
//   console.log("selected", selectedData);
//   res.json({
//     selectedData,
//   });
// }

async function list(req, res) {
  const data = await service.list();

  res.json({
    data,
  });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    atLeastOne,
    dateIsValid,
    dateIsNotTuesday,
    timeIsValid,
    asyncErrorBoundary(create),
  ],
};
