export const ThemeConfig = {
  light: {
    token: {
      colorPrimary: "#018686",
      colorInfo: "#018686",
      colorSuccess: "#37a400",
      colorWarning: "#e7a82a",
      colorError: "#e53a3d",
      colorTextBase: "#101010",
      colorBgBase: "#fefefe",
      colorLink: "#047e7e",
      borderRadius: 3,
    },
    components: {
      Button: {
        primaryShadow: "0 1px 1px rgba(5, 145, 255, 0.1)",
        defaultShadow: "0 1px 1px rgba(0, 0, 0, 0.02)",
        dangerShadow: "0 1px 1px rgba(255, 38, 5, 0.06)",
        defaultActiveBorderColor: "rgb(3,120,120)",
        defaultActiveColor: "rgb(1,134,134)",
        defaultHoverBorderColor: "rgb(4,180,180)",
        defaultHoverColor: "rgb(3,177,177)",
        groupBorderColor: "rgb(5,158,158)",
      },
      Menu: {
        itemColor: "rgb(25,148,144)",
        itemHoverBg: "rgb(25,148,144)",
        itemHoverColor: "rgba(252,252,252,0.88)",
        itemActiveBg: "rgb(25,148,144)",
        itemSelectedBg: "rgb(25,148,144)",
        itemSelectedColor: "rgb(255,255,255)",
      },
    },
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
