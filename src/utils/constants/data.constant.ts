const DATA = {
  job: {
    parent: [
      {
        id: 1,
        prefix: "RS2",
        title: "RHS Level 2",
      },
      {
        id: 2,
        prefix: "HS1",
        title: "HS Level 1",
      },
      {
        id: 3,
        prefix: "D2",
        title: "D-Form Level 2",
      },
    ],
    child: [
      {
        id: 1,
        prefix: "CR2",
        title: "Child RHS Level 2",
        parentId: 1,
      },
      {
        id: 2,
        prefix: "CS1",
        title: "Child HS Level 1",
        parentId: 1,
      },
      {
        id: 3,
        prefix: "C2",
        title: "Child D-Form Level 2",
        parentId: 1,
      },
    ],
  },
};

export default DATA;
