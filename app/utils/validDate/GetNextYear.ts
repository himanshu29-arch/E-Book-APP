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
