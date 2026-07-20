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
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  MAX_FILE_SIZE_TEXT: "100MB",
  SUPPORTED_FILE_TYPES_TEXT: "All file types supported",
};


