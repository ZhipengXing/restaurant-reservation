const a = "2023-08-10";
const b = "2023-08-11";
const c = "14:10";
const d = "13:00";
const friday = new Date(b);
const day = friday.getDay();

const time = new Date().getHours() + ":" + new Date().getMinutes();

function compare(a, b) {
  if (a < b) {
    return "yes";
  }
  return "no";
}

// console.log(compare(c, d));
const e = 33;
const f = e >= 1;

const tables = [
  {
    table_id: 3,
    table_name: "#1",
    capacity: 6,
    is_free: true,
    reservation_id: null,
    created_at: "2023-08-16T03:21:24.311Z",
    updated_at: "2023-08-16T03:21:24.311Z",
  },
  {
    table_id: 4,
    table_name: "#2",
    capacity: 6,
    is_free: true,
    reservation_id: null,
    created_at: "2023-08-16T03:21:24.311Z",
    updated_at: "2023-08-16T03:21:24.311Z",
  },
  {
    table_id: 5,
    table_name: "#6",
    capacity: 6,
    is_free: true,
    reservation_id: null,
    created_at: "2023-08-16T04:00:45.715Z",
    updated_at: "2023-08-16T04:00:45.715Z",
  },
  {
    table_id: 1,
    table_name: "Bar #1",
    capacity: 1,
    is_free: true,
    reservation_id: null,
    created_at: "2023-08-16T03:21:24.311Z",
    updated_at: "2023-08-16T03:21:24.311Z",
  },
  {
    table_id: 2,
    table_name: "Bar #2",
    capacity: 1,
    is_free: true,
    reservation_id: null,
    created_at: "2023-08-16T03:21:24.311Z",
    updated_at: "2023-08-16T03:21:24.311Z",
  },
  {
    table_id: 6,
    table_name: "fdsa",
    capacity: 4,
    is_free: true,
    reservation_id: 5,
    created_at: "2023-08-16T06:32:56.701Z",
    updated_at: "2023-08-16T06:32:56.701Z",
  },
];

const g = "  ";

const freeTables = tables.filter((table) => !table.reservation_id);
const mapTables = tables.map((table) => !table.reservation_id);

const today = new Date();
const today1 = "2023-08-23";
const localDate = new Date(today + "Z");
const inputdate = new Date(today1 + "Z");
const localtoday = today.toLocaleDateString();

function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

const time1 = "1000";
const time2 = "8:51";

// console.log(g.split(" ").join("").length);
// console.log(localDate, typeof localDate);
// console.log(asDateString(localDate));
// console.log(asDateString(inputdate));
console.log(Number(time1.replace(":", "")) < Number(time2.replace(":", "")));
