import { Col, Row, Typography } from "antd";
import CSFormItem from "../atoms/cs-form-item";
import CSInput from "../atoms/cs-input";
import CSUpload from "../atoms/cs-upload";
import { UploadOutlined } from "@ant-design/icons";
import CSButton from "../atoms/cs-button";
import CSTextarea from "../atoms/cs-textarea";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";

export interface CSFormDetails {
  document?: { [key: string]: string };
  setDocument: Dispatch<SetStateAction<{ [key: string]: string } | undefined>>;
}

const CSFormDetail = (props: PropsWithChildren<CSFormDetails>) => {
  const handleDocument = (id: string, name: string) => {
    props.setDocument((prev) => ({
      ...prev,
      [name]: id,
    }));
  };

  return (
    <>
      <Typography.Title level={4} style={{ marginTop: 5 }}>
        Form Detail
      </Typography.Title>

      <Row gutter={[12, 12]}>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CSFormItem
            name={"form_name"}
            label="Form Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <CSInput placeholder="Name" />
          </CSFormItem>
        </Col>
        <Col lg={4} md={6} sm={10} xs={24}>
          <CSFormItem
            name={"form_prefix"}
            label="Form Prefix"
            rules={[{ required: true, message: "Prefix is required" }]}
          >
            <CSInput placeholder="Form Prefix" />
          </CSFormItem>
        </Col>
        <Col lg={8} md={10} sm={15} xs={24}>
          <CSFormItem
            name={"form_document"}
            label="Document"
            rules={[{ required: true, message: "Document is required" }]}
          >
            <CSUpload
              multiple={false}
              accept=".pdf,.docx,.xlsx"
              name="document"
              setIdHandler={handleDocument}
              document={props.document}
            >
              <CSButton icon={<UploadOutlined />}>Select File</CSButton>
            </CSUpload>
          </CSFormItem>
        </Col>
        <Col span={24}>
          <CSFormItem name={"form_description"} label="Description">
            <CSTextarea placeholder="Description about form" rows={3} />
          </CSFormItem>
        </Col>
      </Row>
    </>
  );
};

export default CSFormDetail;
