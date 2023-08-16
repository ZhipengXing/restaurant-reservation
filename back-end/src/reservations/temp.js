const a = "2023-08-10";
const b = "2023-08-11";
const c = "14:10";
const d = "13:00";
const friday = new Date(b);
const today = new Date();
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
const f = e>=1;
console.log(f);
