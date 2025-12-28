export const CONSTANTS = Object.freeze({
  REGEX: {
    EMAIL:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    PHONE: /^[0-9]{11}$/,
    INTERNATIONAL_PHONE: /^\+[1-9]\d{7,14}$/,
    NATIONAL_CODE: /^[0-9]{10}$/,
    FOREIGN_NATIONAL_CODE: /^[A-Za-z0-9]{5,20}$/,
  },
});


export const mapDifficulty = {
  'easy': {
    predicate: (diff: number) => diff >= 1 && diff <= 4,
    value: 'easy',
    title: 'Beginner',
  },
  'medium': {
    predicate: (diff: number) => diff >= 5 && diff <= 7,
    value: 'medium',
    title: 'Intermediate',
  },
  'hard': {
    predicate: (diff: number) => diff >= 8,
    value: 'hard',
    title: 'Advanced',
  },
}

export const MONTHS = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
}