export const ThemeConfig = {
  light: {
    token: {
      // Primary and Secondary Colors
      colorPrimary: "#bcb495", // Fluent UI primary blue
      colorPrimaryHover: "#c1b481",
      colorPrimaryActive: "#c1b481",
      // colorPrimary: "#0078D4", // Fluent UI primary blue
      // colorPrimaryHover: "#005A9E",
      // colorPrimaryActive: "#004578",

      // Background Colors
      colorBgContainer: "#FaFaFa", // Neutral light background
      colorBgElevated: "#ffffff", // White for elevated surfaces
      colorBgLayout: "#ffffffe0", // Slightly darker background for layout areas
      colorBgSpotlight: "#ffffff",

      // Text Colors
      colorText: "#323130", // Dark text color
      colorTextSecondary: "#605E5C", // Secondary text color
      colorTextPlaceholder: "#A19F9D", // Placeholder text color
      colorTextDisabled: "#C8C6C4", // Disabled text color
      colorTextLightSolid: "#ffffff", // Light text on dark background

      // Border Colors
      colorBorder: "#E1DFDD", // Light border color
      colorBorderSecondary: "#d7d7d7", // Secondary border color

      // Input and Form Colors
      colorInputBorder: "#E1DFDD", // Input border color
      colorInputBackground: "#ffffff",
      colorInputPlaceholder: "#A19F9D",

      // Hover and Active States
      colorBgHover: "#E1DFDD",
      colorBgActive: "#C8C6C4",

      // Button and Element Styling
      borderRadius: 4, // Rounded corners consistent with Fluent UI
      controlHeight: 32, // Base control height for buttons and inputs

      // Shadows
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for elevated elements

      // Font and Typography
      fontFamily: "Segoe UI, sans-serif", // Fluent UI default font
      fontSizeBase: 14, // Base font size
      lineHeightBase: 1.5, // Line height for readable text

      // Divider
      colorSplit: "#E1DFDD", // Divider color
    },
    // {
    //   colorPrimary: "#018686",
    //   colorInfo: "#018686",
    //   colorSuccess: "#37a400",
    //   colorWarning: "#e7a82a",
    //   colorError: "#e53a3d",
    //   colorTextBase: "#101010",
    //   colorBgBase: "#fefefe",
    //   colorLink: "#047e7e",
    //   borderRadius: 3,
    // },
    // components: {
    //   Button: {
    //     primaryShadow: "0 1px 1px rgba(5, 145, 255, 0.1)",
    //     defaultShadow: "0 1px 1px rgba(0, 0, 0, 0.02)",
    //     dangerShadow: "0 1px 1px rgba(255, 38, 5, 0.06)",
    //     defaultActiveBorderColor: "rgb(3,120,120)",
    //     defaultActiveColor: "rgb(1,134,134)",
    //     defaultHoverBorderColor: "rgb(4,180,180)",
    //     defaultHoverColor: "rgb(3,177,177)",
    //     groupBorderColor: "rgb(5,158,158)",
    //   },
    //   Menu: {
    //     itemColor: "rgb(25,148,144)",
    //     itemHoverBg: "rgb(25,148,144)",
    //     itemHoverColor: "rgba(252,252,252,0.88)",
    //     itemActiveBg: "rgb(25,148,144)",
    //     itemSelectedBg: "rgb(25,148,144)",
    //     itemSelectedColor: "rgb(255,255,255)",
    //   },
    //   Segmented: {
    //     itemHoverBg: "rgba(1,134,134,0.75)",
    //     itemActiveBg: "rgb(1,134,134)",
    //     itemHoverColor: "rgba(255,255,255,0.88)",
    //     itemSelectedBg: "rgb(1,134,134)",
    //     itemSelectedColor: "rgba(255,255,255,0.88)",
    //     itemColor: "rgb(1,134,134)",
    //     fontSize: 14,
    //     fontSizeLG: 16,
    //   },
    // },
  },
};

export const ProjectData = {
  forms: [
    {
      id: 1,
      name: "Form 1",
      prefix: "A",
      children: [
        { id: 1, name: "Form 1", prefix: "A", formId: 1 },
        { id: 2, name: "Form 2", prefix: "B", formId: 2 },
      ],
    },
    {
      id: 2,
      name: "Form 2",
      prefix: "B",
      children: [
        {
          id: 1,
          name: "Form 3 Form 3 Form 3Form 3Form 3 Form 3 Form 3",
          prefix: "A",
          formId: 1,
        },
        { id: 2, name: "Form 4", prefix: "B", formId: 2 },
      ],
    },
  ],
};
