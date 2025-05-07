export default function getTodayDateForX() {
  const today = (new Date()).toDateString().split(" ");
  const day = today[2].replace(/^0/, "");
  const month = today[1];
  return month + " " + day;
}