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
  new_form: {
    form_name: "Chloe Norton",
    form_prefix: "Rerum eu ut qu",
    form_document: [
      {
        id: "e5223a4a-e1bb-4f7f-9c3b-4ab28cd166dc",
        url: "http://localhost:3002/api/uploads/docx_1731631529602.docx",
        name: "apc-submission-template-2018-pathways2.docx",
        uid: "__AUTO__1731631529629_0__",
      },
    ],
    form_description: "Officia odio nisi ex",
    form_section: [
      {
        form_fields: [
          {
            name: "Sara Burt",
            mapper: "Exercitationem enim ",
            orderNo: "38",
            has_attachment: true,
            type: "CHECKBOX",
          },
          {
            name: "Hilel Burgess",
            mapper: "Perspiciatis non te",
            orderNo: "5",
            type: "CHECKBOX",
            has_attachment: true,
          },
        ],
        name: "Kieran Porter",
        prefix: "Illum sit obcaecat",
      },
      {
        form_fields: [
          {
            name: "Sierra William",
            mapper: "Corrupti non labore",
            orderNo: "77",
            has_attachment: true,
            type: "INPUT",
          },
          {
            name: "Juliet Kane",
            mapper: "Est dolore commodi ",
            orderNo: "3",
            has_attachment: true,
            type: "FILE",
          },
        ],
        name: "Christine Hull",
        prefix: "Mollit ratione cillu",
      },
      {
        form_fields: [
          {
            name: "Tucker Padilla",
            mapper: "Nisi mollitia tenetu",
            orderNo: "15",
            type: "TEXTAREA",
          },
          {
            name: "Isabelle Mullen",
            mapper: "Non duis explicabo ",
            orderNo: "69",
            type: "RADIO",
            has_attachment: true,
          },
          {
            name: "Abraham Martinez",
            mapper: "Veniam ut laudantiu",
            orderNo: "49",
            has_attachment: true,
            type: "SENTENCE",
          },
        ],
        name: "Neve Ingram",
        prefix: "Consectetur non ame",
      },
      {
        name: "Renee Hale",
        prefix: "Nisi sit quidem tem",
      },
    ],
  },
};

export default DATA;
