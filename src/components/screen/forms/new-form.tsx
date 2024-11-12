import { Divider, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { UploadFile } from "antd/lib";
import { useParams } from "react-router-dom";
import CSFormHeader from "../../theme/molecules/cs-form-header";
import CSButton from "../../theme/atoms/cs-button";
import { useState } from "react";
import CSFormDetail from "../../theme/organisms/cs-form-detail";
import CSFormFieldDetail from "../../theme/organisms/cs-form-field-detail";

export type TFormField =
  | "CHECKBOX"
  | "INPUT"
  | "SENTENCE"
  | "RADIO"
  | "DATE"
  | "FILE";

export interface IFormFields {
  name: string;
  mapper: string;
  orderNo: number;
  has_attachment: boolean;
  type: TFormField;
}

export interface INewForm {
  form_name: string;
  form_prefix: string;
  form_document: UploadFile;
  form_description: string;
  form_fields: IFormFields[];
}

const NewForm = () => {
  const [form] = useForm();
  const params = useParams();
  const [documents, setDocuments] = useState<{ [key: string]: string }>();

  const onFinish = (values: INewForm) => {
    console.log("values: ", values);
  };

  return (
    <div className="new-form">
      <Form
        layout="vertical"
        className="dynamic-form"
        name="dynamicForm"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <CSFormHeader />

        <CSFormDetail setDocument={setDocuments} document={documents} />

        <Divider />

        <CSFormFieldDetail />

        <Divider />
        <div className="submit-btn">
          <Form.Item>
            <CSButton type="primary" htmlType="submit">
              {params?.id === "new" ? "Create Form" : "Update Form"}
            </CSButton>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default NewForm;
