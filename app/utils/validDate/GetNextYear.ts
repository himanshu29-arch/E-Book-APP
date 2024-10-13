// Create a new Date object with the current date
const currentDate = new Date();

// Get the year of the current date and add 1 to get the next year
const nextYear = currentDate.getFullYear() + 1;

// Create a new Date object for the same date next year
const nextYearDate = new Date(currentDate.setFullYear(nextYear));

// Define an array of month names
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Get the day, month, and year from the next year date
const day = nextYearDate.getDate();
const month = monthNames[nextYearDate.getMonth()];
const year = nextYearDate.getFullYear();

// Format the date as "31 December 2024"
const date_one_year_from_today = `${day} ${month} ${year}`;

export default date_one_year_from_today;

export function getTimeAgo(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);

  // Define time intervals in seconds
  const seconds = diffInSeconds;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} ${seconds === 1 ? 'sec' : 'secs'} ago`;
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
}
