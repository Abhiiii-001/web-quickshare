export const ErrorMessage = {
  REQUIRED: "This is a required field.",
  PASSWORD_MIN_LENGTH: (len: number) =>
    `Password must be at least ${len} characters`,
};

export const CommonConstants = {
  EXPIRIES_DURATION: ["1", "2", "3"],
  EXPORIED_DURATION_LIST: [
    { label: "1 Hour", value: "1" },
    { label: "8 Hour", value: "2" },
    { label: "24 Hour", value: "3" },
  ],
  DOWNLOAD_LIMIT: {
    MIN: 1,
    MAX: 10,
  },
  PASSWORD_LENGTH: {
    MIN: 6,
  },
};

export const CODE_PORTAL_LANGUAGES = {
  JAVASCRIPT: "javascript",
  PYTHON: "python",
  HTML: "html",
  JAVA: "java",
  CPP: "cpp",
  PLAINTEXT: "plaintext",
};

export const CODE_PORTAL_LANGUAGES_OPTIONS = [
  { label: "JavaScript / TypeScript", value: CODE_PORTAL_LANGUAGES.JAVASCRIPT },
  { label: "Python", value: CODE_PORTAL_LANGUAGES.PYTHON },
  { label: "HTML / CSS", value: CODE_PORTAL_LANGUAGES.HTML },
  { label: "Java", value: CODE_PORTAL_LANGUAGES.JAVA },
  { label: "C++", value: CODE_PORTAL_LANGUAGES.CPP },
  { label: "Plain Text", value: CODE_PORTAL_LANGUAGES.PLAINTEXT },
];

export const CODE_PORTAL_DURATION_OPTIONS = [
  { label: "1 Hour", value: "1" },
  { label: "4 Hours", value: "4" },
  { label: "8 Hours", value: "8" },
  { label: "24 Hours", value: "24" },
];
