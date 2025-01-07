import { Divider, Form, Popconfirm, Popover } from "antd";
import CSButton from "../atoms/cs-button";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import CSInput from "../atoms/cs-input";
import CSSelect from "../atoms/cs-select";
import { FormFieldType } from "../../../utils/enum/general.enum";
import CSCheckbox from "../atoms/cs-checkbox";
import { Fragment } from "react";

const CSFormFieldDetail = (props: { id: number }) => {
  return (
    <div className="cs-form-field-detail">
      <Form.List name={[props.id, "form_field"]}>
        {(fields, { add: addField, remove: removeField }) => {
          return (
            <div>
              {fields.length >= 1 ? <Divider>Section Fields</Divider> : null}
              {fields.map((field, index) => (
                <div key={field.key} className="list-item-cont">
                  <div className="field-list-item">
                    <Form.Item name={[index, "id"]} hidden={true}>
                      <input type="hidden" />
                    </Form.Item>
                    <Form.Item
                      name={[index, "name"]}
                      rules={[{ required: true, message: "" }]}
                    >
                      <CSInput
                        placeholder="Name"
                        size="small"
                        style={{ minWidth: 100 }}
                      />
                    </Form.Item>
                    <Form.Item
                      name={[index, "type"]}
                      rules={[{ required: true, message: "" }]}
                    >
                      <CSSelect
                        size="small"
                        placeholder="Field Type"
                        options={[
                          { label: "Input", value: FormFieldType.INPUT },
                          {
                            label: "Checkbox",
                            value: FormFieldType.CHECKBOX,
                          },
                          { label: "Radio", value: FormFieldType.RADIO },
                          {
                            label: "Textarea",
                            value: FormFieldType.TEXTAREA,
                          },
                          {
                            label: "Sentence",
                            value: FormFieldType.SENTENCE,
                          },
                          { label: "Date", value: FormFieldType.DATE },
                          { label: "File", value: FormFieldType.FILE },
                          {
                            label: "Table Element",
                            value: FormFieldType.TABLE_ELEMENT,
                          },
                          {
                            label: "Accomodation",
                            value: FormFieldType.ACCOMODATION,
                          },
                        ]}
                        style={{ minWidth: 125 }}
                      />
                    </Form.Item>
                    <Popover
                      destroyTooltipOnHide
                      rootClassName="field-inner"
                      content="Used for Document Keyword Matching."
                    >
                      <Form.Item
                        name={[index, "mapperName"]}
                        rules={[{ required: true, message: "" }]}
                      >
                        <CSInput
                          placeholder="Mapper Name"
                          size="small"
                          style={{ minWidth: 100 }}
                        />
                      </Form.Item>
                    </Popover>
                    <Form.Item
                      name={[index, "orderNo"]}
                      rules={[{ required: true, message: "" }]}
                    >
                      <CSInput
                        type="number"
                        placeholder="Order No."
                        size="small"
                        style={{ maxWidth: 80 }}
                      />
                    </Form.Item>
                    <Form.Item
                      name={[index, "placeholder"]}
                      rules={[{ required: true, message: "" }]}
                    >
                      <CSInput
                        placeholder="Placeholder"
                        size="small"
                        style={{ minWidth: 100 }}
                      />
                    </Form.Item>
                    <Form.Item
                      valuePropName="checked"
                      name={[index, "required"]}
                    >
                      <CSCheckbox>Required</CSCheckbox>
                    </Form.Item>
                    <Form.Item valuePropName="checked" name={[index, "rating"]}>
                      <CSCheckbox>Rating</CSCheckbox>
                    </Form.Item>
                    <Form.Item
                      valuePropName="checked"
                      name={[index, "reference"]}
                    >
                      <CSCheckbox>Reference</CSCheckbox>
                    </Form.Item>
                    <Form.Item name={[index, "values"]}>
                      <CSSelect
                        size="small"
                        mode="tags"
                        style={{ width: "max-content", minWidth: 120 }}
                        placeholder="Values"
                        // options={}
                      />
                    </Form.Item>
                    <Form.Item name={[index, "links"]}>
                      <CSSelect
                        size="small"
                        mode="tags"
                        style={{ width: "max-content", minWidth: 130 }}
                        placeholder="Links (Optional)"
                        // options={}
                      />
                    </Form.Item>
                  </div>
                  <div className="delete-btn">
                    <Popconfirm
                      title="Delete"
                      description="Do you really want to delete?"
                      onConfirm={() => removeField(index)}
                    >
                      <DeleteFilled />
                    </Popconfirm>
                  </div>
                </div>
              ))}
              <Divider />
              <Form.Item>
                <CSButton
                  type="default"
                  onClick={() => addField()}
                  style={{ width: "6rem" }}
                >
                  <PlusOutlined /> Add Field
                </CSButton>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </div>
  );
};

// const columns: (
//   | ColumnGroupType<FormListFieldData>
//   | ColumnType<FormListFieldData>
// )[] = [
//   {
//     title: "Name",
//     key: "name",
//     render: (_, { name, ...restField }: FormListFieldData) => (
//       <>
//         <Form.Item {...restField} name={[index, [name,] "id"]} hidden={true}>
//           <input type="hidden" />
//         </Form.Item>
//         <Form.Item
//           {...restField}
//           name={[name, "name"]}
//           rules={[{ required: true, message: "" }]}
//         >
//           <CSInput placeholder="Name" size="small" />
//         </Form.Item>
//       </>
//     ),
//   },
//   {
//     title: "Type",
//     key: "type",
//     render: (_, { name, ...restField }: FormListFieldData) => (
//       <Form.Item
//         {...restField}
//         name={[name, "type"]}
//         rules={[{ required: true, message: "" }]}
//       >
//         <CSSelect
//           size="small"
//           placeholder="Field Type"
//           options={[
//             { label: "Input", value: FormFieldType.INPUT },
//             {
//               label: "Checkbox",
//               value: FormFieldType.CHECKBOX,
//             },
//             { label: "Radio", value: FormFieldType.RADIO },
//             {
//               label: "Textarea",
//               value: FormFieldType.TEXTAREA,
//             },
//             {
//               label: "Sentence",
//               value: FormFieldType.SENTENCE,
//             },
//             { label: "Date", value: FormFieldType.DATE },
//             { label: "File", value: FormFieldType.FILE },
//             { label: "Table", value: FormFieldType.TABLE },
//           ]}
//           style={{ minWidth: 120 }}
//         />
//       </Form.Item>
//     ),
//   },
//   {
//     title: "Mapper Name",
//     key: "mapperName",
//     render: (_, { name, ...restField }: FormListFieldData) => (
//       <Form.Item
//         {...restField}
//         name={[name, "mapperName"]}
//         rules={[{ required: true, message: "" }]}
//       >
//         <CSInput placeholder="Mapper Name" size="small" />
//       </Form.Item>
//     ),
//   },
//   {
//     title: "Order No.",
//     key: "orderNo",
//     render: (_, { name, ...restField }: FormListFieldData) => (
//       <Form.Item
//         {...restField}
//         name={[name, "orderNo"]}
//         rules={[{ required: true, message: "" }]}
//       >
//         <CSInput type="number" placeholder="Order No." size="small" />
//       </Form.Item>
//     ),
//   },
//   {
//     title: "Placeholder",
//     key: "placeholder",
//     render: (_, { name, ...restField }: FormListFieldData) => (
//       <Form.Item
//         {...restField}
//         name={[name, "placeholder"]}
//         rules={[{ required: true, message: "" }]}
//       >
//         <CSInput placeholder="Placeholder" size="small" />
//       </Form.Item>
//     ),
//   },
//   {
//     title: "Required",
//     key: "required",
//     render: (_, { name, ...restField }: FormListFieldData) => (
//       <Form.Item
//         {...restField}
//         valuePropName="checked"
//         name={[name, "required"]}
//         rules={[{ required: true, message: "" }]}
//       >
//         <CSCheckbox></CSCheckbox>
//       </Form.Item>
//     ),
//   },
//   {
//     title: "Rating",
//     key: "rating",
//     render: (_, { name, ...restField }: FormListFieldData) => (
//       <Form.Item
//         {...restField}
//         valuePropName="checked"
//         name={[name, "rating"]}
//         rules={[{ required: true, message: "" }]}
//       >
//         <CSCheckbox></CSCheckbox>
//       </Form.Item>
//     ),
//   },
//   {
//     title: "Attachments",
//     key: "attachments",
//     render: (_, { name, ...restField }: FormListFieldData) => (
//       <Form.Item
//         {...restField}
//         valuePropName="checked"
//         name={[name, "attachments"]}
//         rules={[{ required: true, message: "" }]}
//       >
//         <CSCheckbox></CSCheckbox>
//       </Form.Item>
//     ),
//   },
//   {
//     title: "Action",
//     key: "action",
//     render: (_, _props: FormListFieldData, ind) => (
//       <span>
//         <DeleteFilled
//           style={{ color: "tomato" }}
//           onClick={() => props.remove(ind)}
//         />
//       </span>
//     ),
//   },
// ];

export default CSFormFieldDetail;
