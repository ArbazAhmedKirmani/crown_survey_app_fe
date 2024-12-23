export const APP_CONSTANTS = {
  APP: { URL: import.meta.env.VITE_APP_BASE_URL },
  LOCAL_STORAGE: {
    IS_AUTHENTICATED: "b07163fe-06ea-46d2-947b-6a586618110c",
  },
  AUTH: {
    AUTH_TOKEN: "b07163fe-f4c4-43f9-b490-6dd7f87a89a1",
    REFRESH_TOKEN: "6e6e2861-81b7-4e28-b26b-f8eb2baa43fb",
    REMEMBER_ME: "2640995e-c3a5-474d-90c3-efda25b8c5e3",
    UUID: "5c88941a-12e1-4d06-a8d1-e615180765a3",
    USER_EMAIL: "7d2ecb3e-49b5-4a95-b44e-af809bdadd45",
    USER_OTP: "dc1f0e3d-06ea-46d2-947b-6a586618110c",
  },
  API: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3002/",
  },
  ARRAY_IDENTIFY_PATTERN: /\[(.*?)\]/g,
  OBJECT_IDENTIFY_PATTERN: /\{(.*?)\}/g,
  ALLOWED_IMG_EXTENSIONS: [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".tiff",
    ".webp",
    ".svg",
  ],
  ACCOMODATION: {
    COL: [
      "Living Rooms",
      "Bedrooms",
      "Bath / Shower",
      "Seperate Toilet",
      "Kitchen",
      "Utility Room",
      "Conservatory",
      "Other",
    ],
    ROW: [
      "Lower Ground",
      "Ground",
      "First",
      "Second",
      "Third",
      "Other",
      "Roof Space",
    ],
    DATA_SET: [
      [
        {
          "Lower Ground_Living Rooms": 0,
        },
        {
          "Lower Ground_Bedrooms": 0,
        },
        {
          "Lower Ground_Bath / Shower": 0,
        },
        {
          "Lower Ground_Seperate Toilet": 0,
        },
        {
          "Lower Ground_Kitchen": 0,
        },
        {
          "Lower Ground_Utility Room": 0,
        },
        {
          "Lower Ground_Conservatory": 0,
        },
        {
          "Lower Ground_Other": 0,
        },
      ],
      [
        {
          "Ground_Living Rooms": 0,
        },
        {
          Ground_Bedrooms: 0,
        },
        {
          "Ground_Bath / Shower": 0,
        },
        {
          "Ground_Seperate Toilet": 0,
        },
        {
          Ground_Kitchen: 0,
        },
        {
          "Ground_Utility Room": 0,
        },
        {
          Ground_Conservatory: 0,
        },
        {
          Ground_Other: 0,
        },
      ],
      [
        {
          "First_Living Rooms": 0,
        },
        {
          First_Bedrooms: 0,
        },
        {
          "First_Bath / Shower": 0,
        },
        {
          "First_Seperate Toilet": 0,
        },
        {
          First_Kitchen: 0,
        },
        {
          "First_Utility Room": 0,
        },
        {
          First_Conservatory: 0,
        },
        {
          First_Other: 0,
        },
      ],
      [
        {
          "Second_Living Rooms": 0,
        },
        {
          Second_Bedrooms: 0,
        },
        {
          "Second_Bath / Shower": 0,
        },
        {
          "Second_Seperate Toilet": 0,
        },
        {
          Second_Kitchen: 0,
        },
        {
          "Second_Utility Room": 0,
        },
        {
          Second_Conservatory: 0,
        },
        {
          Second_Other: 0,
        },
      ],
      [
        {
          "Third_Living Rooms": 0,
        },
        {
          Third_Bedrooms: 0,
        },
        {
          "Third_Bath / Shower": 0,
        },
        {
          "Third_Seperate Toilet": 0,
        },
        {
          Third_Kitchen: 0,
        },
        {
          "Third_Utility Room": 0,
        },
        {
          Third_Conservatory: 0,
        },
        {
          Third_Other: 0,
        },
      ],
      [
        {
          "Other_Living Rooms": 0,
        },
        {
          Other_Bedrooms: 0,
        },
        {
          "Other_Bath / Shower": 0,
        },
        {
          "Other_Seperate Toilet": 0,
        },
        {
          Other_Kitchen: 0,
        },
        {
          "Other_Utility Room": 0,
        },
        {
          Other_Conservatory: 0,
        },
        {
          Other_Other: 0,
        },
      ],
      [
        {
          "Roof Space_Living Rooms": 0,
        },
        {
          "Roof Space_Bedrooms": 0,
        },
        {
          "Roof Space_Bath / Shower": 0,
        },
        {
          "Roof Space_Seperate Toilet": 0,
        },
        {
          "Roof Space_Kitchen": 0,
        },
        {
          "Roof Space_Utility Room": 0,
        },
        {
          "Roof Space_Conservatory": 0,
        },
        {
          "Roof Space_Other": 0,
        },
      ],
    ],
  },
};

Object.seal(APP_CONSTANTS);
