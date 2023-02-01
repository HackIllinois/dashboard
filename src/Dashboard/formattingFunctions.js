// This function will turn a Javascript Date into Hours, Minutes, isAm
export default function getTime(givenDate) {
  let hours = givenDate.getHours();
  let minutes = givenDate.getMinutes();

  const isAm = hours < 12;

  if (!isAm) {
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }

  minutes = minutes.toString().padStart(2, '0');

  return {
    hours,
    minutes,
    isAm,
  };
}
