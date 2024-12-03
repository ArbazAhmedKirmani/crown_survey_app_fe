import { Form, Image, Spin } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
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
import { useForm } from "antd/es/form/Form";
import useJobStore from "../../../store/job.store";
import usePostApi from "../../../hooks/use-post-api";
import { AnyObject } from "antd/es/_util/type";
import { useParams } from "react-router-dom";

export interface IFormFieldResponse {
  id: string;
  name: string;
  mapperName: string;
  orderNumber: number;
  required: boolean;
  type: FormFieldType;
  response: boolean;
  placeholder: String;
  values: string;
}

export interface CSDynamicFieldsRenderer {
  title?: string;
  values: any;
}

const CSDynamicFieldsRenderer = forwardRef(
  (props: CSDynamicFieldsRenderer, ref) => {
    const { getQuery } = useQueryString();
    const [reference, setReference] = useState(false);
    const [form] = useForm();
    const { job } = useJobStore();
    const params = useParams();

    const fieldId = getQuery(
      QUERY_STRING.OTHER_PARAMS.SELECTED_FIELD
    ) as string;

    useImperativeHandle(ref, () => ({
      formValue: () =>
        data?.data?.mapperName && {
          [data?.data?.mapperName]: form.getFieldsValue(),
        },
    }));

    const { data, isLoading } = useGetApi<IApiResponse<IFormFieldResponse>>({
      key: [API_ROUTES.jobs.getFieldsDetail(fieldId), fieldId],
      url: API_ROUTES.jobs.getFieldsDetail(fieldId),
      enabled: Boolean(fieldId),
    });

    const {
      data: fieldData,
      isLoading: fieldLoading,
      isSuccess,
    } = useGetApi<IApiResponse<{ id: String; data: any }>>({
      key: [
        API_ROUTES.jobs.getJobFields(fieldId, params?.id!),
        fieldId,
        params?.id,
      ],
      url: API_ROUTES.jobs.getJobFields(fieldId, params?.id!),
      enabled: Boolean(fieldId) && params?.id !== "new",
      options: {
        staleTime: 0,
      },
    });

    const { mutate: mutateJob, isPending: jobLoading } = usePostApi<
      {
        fieldId: string;
        data: AnyObject;
      },
      {
        id: string;
        fieldId: string;
        data: AnyObject;
      }
    >({
      url: API_ROUTES.jobs.detail(params.id!),
      onSuccess: (data) => {
        delete data?.data?.data?.id;
        form.setFieldsValue({ ...data?.data?.data, id: data.data.id });
      },
    });

    const handleModal = () => {
      setReference((prev) => !prev);
    };

    useEffect(() => {
      if (isSuccess && fieldData?.data) {
        const _obj = { ...fieldData.data.data, id: fieldData.data.id };
        form.setFieldsValue(_obj);
      }
    }, [isSuccess]);

    return (
      <Spin spinning={isLoading || jobLoading || fieldLoading}>
        {data?.data?.mapperName && (
          <div className="cs-dynamic-fields-renderer">
            {props?.title && <h3>{data.data.name}</h3>}
            <Form
              layout="vertical"
              form={form}
              style={{ width: "100%" }}
              initialValues={job?.[data.data.mapperName]}
              onFinish={(values) => {
                mutateJob({ fieldId: fieldId, data: values });
              }}
            >
              <CSFormItem name={"id"} hidden>
                <input hidden />
              </CSFormItem>

              <CSDynamicField
                type={data?.data?.type}
                nestedProps={data?.data}
              />
              {data?.data?.response && (
                <div>
                  <div className="option-bar">
                    <CSButton type="default" onClick={handleModal}>
                      Add Reference
                    </CSButton>
                    <CSFormItem
                      name={"field_attachment"}
                      style={{ width: "100%" }}
                      valuePropName="fileList"
                    >
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
                    </CSFormItem>
                  </div>
                  <CSFormItem
                    key={data.data.id}
                    name={"siteNote"}
                    style={{ width: "100%" }}
                  >
                    <CSTextarea placeholder="Side Notes" rows={3} />
                  </CSFormItem>
                  <div className="option-bar">
                    <CSButton type="default" onClick={handleModal}>
                      Add Reference
                    </CSButton>
                    <CSFormItem
                      name={"field_attachment"}
                      style={{ width: "100%" }}
                      valuePropName="fileList"
                    >
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
                    </CSFormItem>
                  </div>
                </div>
              )}
              <CSButton htmlType="submit" type="primary">
                Save
              </CSButton>
            </Form>
            <CSReferenceSidebar
              drawerProps={{
                title: "References",
                placement: "right",
                onClose: handleModal,
                open: reference,
                getContainer: false,
                width: "85%",
                destroyOnClose: true,
              }}
            />
          </div>
        )}
      </Spin>
    );
  }
);

export default CSDynamicFieldsRenderer;
