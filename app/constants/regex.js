export const regex = {
  NAME: /^(?=.{2,24}$)[a-zA-Z']+$/u,
  // EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  EMAIL: /^[A-Za-z0-9._%+\s-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  // EMAIL: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  MOBILE: /^\d{11}$/,
  ZIPCODE: /^(?!0{5})[0-9]{5}$/,
  LAST_NAME: /^(?=.{2,24}$)[a-zA-Z']+$/u,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/,
  SEARCH: /^[a-zA-Z0-9!@#$%^&*()_\-=+\s]+$/,
  EMOJI: /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  /* "Abc123@" <> Valid password
    "weakpass" <> Invalid passwor  */
};
