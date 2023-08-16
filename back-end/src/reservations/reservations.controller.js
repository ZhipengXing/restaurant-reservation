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
////ZXquestions07:people becomes a string, how to validate input is number
function peopleValidation(req, res, next) {
  const people = req.body.data.people;
  console.log("people", people, typeof people);
  if (people >= 1) {
    // && typeof people == "number"
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
//ZXquestions05:need to add 1 so the day works?
function dateIsNotTuesday(req, res, next) {
  const date = req.body.data.reservation_date;
  const day = new Date(date);
  const dayOfTheWeek = day.getDay() + 1;
  console.log(dayOfTheWeek);
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
  res.status(201).json({ data: newReservation });
  console.log("here", newReservation);
}
//ZXquestions04: trying to do this at backend but frontend is not getting the right result
async function list(req, res) {
  let date = req.query.date;
  const allData = await service.list();

  //ZXnotes📝:if we want /reservations to show all reservations and not just today
  // if (!date) {
  //   const data = allData;
  //   res.json({
  //     data,
  //   });
  // }

  //ZXnotes📝: API will only select reservations for the queried date
  if (!date) {
    date = new Date().toJSON().slice(0, 10);
  }
  console.log("date", date);

  //ZXnotes📝: filter out dates and sort by time, earliest first
  const data = allData
    .filter((reservation) => reservation.reservation_date === date)
    .sort((a, b) => (a.reservation_time < b.reservation_time ? -1 : 1));

  res.json({
    data,
  });
  console.log("selected", data);
}

// async function list(req, res) {
//   const data = await service.list();

//   res.json({
//     data,
//   });

//   console.log("data", data);
// }

module.exports = {
  list: [asyncErrorBoundary(list)],
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
    asyncErrorBoundary(create),
  ],
};
