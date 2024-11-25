import { Drawer, Form, Image, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { forwardRef, useImperativeHandle, useState } from "react";
import CSFormItem from "../atoms/cs-form-item";
import { FormFieldType } from "../../../utils/enum/general.enum";
import CSDynamicField from "../molecules/cs-dynamic-field";
import useGetApi from "../../../hooks/use-get-api";
import { IApiResponse } from "../../../utils/interface/response.interface";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import useQueryString from "../../../hooks/use-query-string";
import CSButton from "../atoms/cs-button";
import CSTextarea from "../atoms/cs-textarea";
import Dragger from "antd/es/upload/Dragger";
import CSReferenceSidebar from "./cs-reference-sidebar";

export interface IFormFieldResponse {
  id: string;
  name: string;
  mapperName: string;
  orderNumber: number;
  required: boolean;
  type: FormFieldType;
}

export interface CSDynamicFieldsRenderer {
  title?: string;
}

const CSDynamicFieldsRenderer = forwardRef(
  (props: CSDynamicFieldsRenderer, ref) => {
    const [form] = useForm();
    const { getQuery } = useQueryString();
    const [reference, setReference] = useState(false);

    const fieldId = getQuery(
      QUERY_STRING.OTHER_PARAMS.SELECTED_FIELD
    ) as string;

    useImperativeHandle(ref, () => ({
      getForm: () => form,
    }));

    const { data, isLoading } = useGetApi<IApiResponse<IFormFieldResponse>>({
      key: [API_ROUTES.jobs.getFieldsDetail(fieldId), fieldId],
      url: API_ROUTES.jobs.getFieldsDetail(fieldId),
      enabled: Boolean(fieldId),
    });

    const handleModal = () => {
      setReference((prev) => !prev);
    };

    return (
      <Spin spinning={isLoading}>
        {data?.data && (
          <div className="cs-dynamic-fields-renderer">
            {props?.title && <h3>{data?.data?.name}</h3>}
            <Form layout="vertical" form={form} style={{ width: "100%" }}>
              <CSFormItem name={data?.data?.mapperName}>
                <CSDynamicField
                  type={data?.data?.type}
                  nestedProps={data?.data}
                />
              </CSFormItem>
              <div className="option-bar">
                <CSButton type="default" onClick={handleModal}>
                  Add Reference
                </CSButton>
                <Dragger
                  style={{ width: "100%" }}
                  itemRender={(_, file) => (
                    <Image
                      src="../../../../assets/images/room.png"
                      draggable={false}
                    />
                  )}
                >
                  <p>Add Photos</p>
                </Dragger>
              </div>
              <CSFormItem name={data?.data?.mapperName}>
                <CSTextarea placeholder="Side Notes" rows={3} />
              </CSFormItem>
              <div className="option-bar">
                <CSButton type="default" onClick={handleModal}>
                  Add Reference
                </CSButton>
                <Dragger
                  style={{ width: "100%" }}
                  itemRender={(_, file) => (
                    <Image
                      src="../../../../assets/images/room.png"
                      draggable={false}
                    />
                  )}
                >
                  <p>Add Photos</p>
                </Dragger>
              </div>
            </Form>
            <CSReferenceSidebar
              drawerProps={{
                title: "References",
                placement: "right",
                // closable:{true},
                onClose: handleModal,
                open: reference,
                getContainer: false,
                width: "70%",
              }}
            />
          </div>
        )}
      </Spin>
    );
  }
);

export default CSDynamicFieldsRenderer;
