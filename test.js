const array = [
  { id: 1, date: "10:16" },
  { id: 2, date: "14:35" },
];
// const re = array[0].date - array[1].date;
// const rr = array[0].date;
// const rrr = Date.parse(array[1].date);
// // sorting with latest date
const newArray = array.sort((a, b) => (a.date < b.date ? -1 : 1));

console.log(newArray);
