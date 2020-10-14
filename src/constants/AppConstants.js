export const HTTP_STATUS = {
  UNAUTHORIZED: "401",
};

export const INTERNET_CONNECTION_ERROR = {
  CODE: "INTERNET_ERROR",
  MESSAGE: "Please check your internet connection",
};

export const UNKNOWN_ERROR = {
  CODE: "UNKNOWN_ERROR",
  MESSAGE: "Something went wrong",
};

export const SELECT = "Select";
export const CONTENTS = { name: SELECT };
export const DEFAULT_ITEM = { membershipCode: 0, contents: [CONTENTS] };
export const DROPDOWN_ITEM = [DEFAULT_ITEM];

export const BASE_DIMENSIONS = {
  MOBILE: {
    WIDTH: 320,
    HEIGHT: 568,
  },
  TABLET: {
    WIDTH: 600,
    HEIGHT: 1024,
  },
};
