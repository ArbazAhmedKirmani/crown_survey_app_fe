import { Col, Row, Typography } from "antd";
import CSFormItem from "../atoms/cs-form-item";
import CSInput from "../atoms/cs-input";
import CSUpload from "../atoms/cs-upload";
import { UploadOutlined } from "@ant-design/icons";
import CSButton from "../atoms/cs-button";
import CSTextarea from "../atoms/cs-textarea";
import { MutableRefObject } from "react";
import { AnyObject } from "antd/es/_util/type";

export interface CSFormDetails {
  document_ref: MutableRefObject<AnyObject | undefined>;
}

const CSFormDetail = (props: CSFormDetails) => {
  return (
    <div className="cs-form-detail">
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
            rules={[
              { required: true, message: "Prefix is required" },
              { max: 3, message: "Max 3 Characters" },
            ]}
          >
            <CSInput placeholder="Form Prefix" />
          </CSFormItem>
        </Col>
        <Col lg={8} md={10} sm={15} xs={24}>
          <CSUpload
            ref={props.document_ref}
            multiple={false}
            accept=".pdf,.docx,.xlsx"
            name="document"
            formName="form_document"
            required={true}
            requiredMessage="Document is required"
            label="Document"
          >
            <CSButton icon={<UploadOutlined />}>Select File</CSButton>
          </CSUpload>
        </Col>
        <Col span={24}>
          <CSFormItem name={"form_description"} label="Description">
            <CSTextarea placeholder="Description about form" rows={3} />
          </CSFormItem>
        </Col>
      </Row>
    </div>
  );
};

export default CSFormDetail;
