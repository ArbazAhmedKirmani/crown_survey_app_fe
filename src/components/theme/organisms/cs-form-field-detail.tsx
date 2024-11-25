import {  Form, FormListFieldData, Table } from "antd";
import CSButton from "../atoms/cs-button";
import {  DeleteFilled, PlusOutlined } from "@ant-design/icons";
import CSInput from "../atoms/cs-input";
import CSSelect from "../atoms/cs-select";
import { FormFieldType } from "../../../utils/enum/general.enum";
import CSCheckbox from "../atoms/cs-checkbox";
import { ColumnGroupType } from "antd/lib/table";
import { ColumnType } from "antd/es/table";
import { memo } from "react";

const default_field = {
  id: undefined,
  name: "",
  mapperName: "",
  required: false,
  attachments: false,
  rating: false,
};

const CSFormFieldDetail = (props: { name: number }) => {
  return (
    <div className="cs-form-field-detail">
      <Form.List
        initialValue={[default_field]}
        name={[props.name, "form_fields"]}
      >
        {(fields, { add, remove }) => (
          <div className="ant-table ant-table-small">
            <FieldTable fields={fields} add={add()} remove={remove} />
          </div>
        )}
      </Form.List>
    </div>
  );
};

const FieldTable = memo((props: { fields: any; add: any; remove: any }) => {
  const columns: (
    | ColumnGroupType<FormListFieldData>
    | ColumnType<FormListFieldData>
  )[] = [
    {
      title: "Name",
      key: "name",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <>
          <Form.Item {...restField} name={[name, "id"]} hidden={true}>
            <input type="hidden" />
          </Form.Item>
          <Form.Item
            {...restField}
            name={[name, "name"]}
            rules={[{ required: true, message: "" }]}
          >
            <CSInput placeholder="Name" size="small" />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Type",
      key: "type",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <Form.Item
          {...restField}
          name={[name, "type"]}
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
              { label: "Table", value: FormFieldType.TABLE },
            ]}
            style={{ minWidth: 120 }}
          />
        </Form.Item>
      ),
    },
    {
      title: "Mapper Name",
      key: "mapperName",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <Form.Item
          {...restField}
          name={[name, "mapperName"]}
          rules={[{ required: true, message: "" }]}
        >
          <CSInput placeholder="Mapper Name" size="small" />
        </Form.Item>
      ),
    },
    {
      title: "Order No.",
      key: "orderNo",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <Form.Item
          {...restField}
          name={[name, "orderNo"]}
          rules={[{ required: true, message: "" }]}
        >
          <CSInput type="number" placeholder="Order No." size="small" />
        </Form.Item>
      ),
    },
    {
      title: "Placeholder",
      key: "placeholder",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <Form.Item
          {...restField}
          name={[name, "placeholder"]}
          rules={[{ required: true, message: "" }]}
        >
          <CSInput placeholder="Placeholder" size="small" />
        </Form.Item>
      ),
    },
    {
      title: "Required",
      key: "required",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <Form.Item
          {...restField}
          valuePropName="checked"
          name={[name, "required"]}
          rules={[{ required: true, message: "" }]}
        >
          <CSCheckbox></CSCheckbox>
        </Form.Item>
      ),
    },
    {
      title: "Rating",
      key: "rating",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <Form.Item
          {...restField}
          valuePropName="checked"
          name={[name, "rating"]}
          rules={[{ required: true, message: "" }]}
        >
          <CSCheckbox></CSCheckbox>
        </Form.Item>
      ),
    },
    {
      title: "Attachments",
      key: "attachments",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <Form.Item
          {...restField}
          valuePropName="checked"
          name={[name, "attachments"]}
          rules={[{ required: true, message: "" }]}
        >
          <CSCheckbox></CSCheckbox>
        </Form.Item>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, _props: FormListFieldData, ind) => (
        <span>
          <DeleteFilled
            style={{ color: "tomato" }}
            onClick={() => props.remove(ind)}
          />
        </span>
      ),
    },
  ];

  return (
    <Table
      rowClassName="form-fields-row"
      size="small"
      dataSource={props.fields}
      columns={columns}
      pagination={false}
      indentSize={300}
      rowKey={(row, index) => `${index}-${row.name}-${row.key || "unique"}`}
      footer={() => (
        <div>
          <Form.Item>
            <CSButton
              onClick={() => props.add(default_field)}
              style={{ marginTop: 10 }}
              icon={<PlusOutlined />}
            >
              New Field
            </CSButton>
          </Form.Item>
        </div>
      )}
    />
  );
});

export default CSFormFieldDetail;
