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
import { debounce } from "lodash";

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
    const { getQuery, setQuery, removeQuery } = useQueryString();
    const [form] = useForm();
    const { job } = useJobStore();
    const params = useParams();

    const reference = getQuery(
      QUERY_STRING.OTHER_PARAMS.REFERENCE_NAME
    ) as string;
    const section = getQuery(QUERY_STRING.OTHER_PARAMS.CHILD_FORM) as string;
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
      enabled: Boolean(fieldId && params?.id !== "new"),
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
      showSuccessMessage: true,
      onSuccess: (data) => {
        delete data?.data?.data?.id;
        form.setFieldsValue({ ...data?.data?.data, id: data.data.id });
      },
      invalidate: [[API_ROUTES.jobs.getForms, section]],
    });

    const handleModal = (str: string) => {
      setQuery({ [QUERY_STRING.OTHER_PARAMS.REFERENCE_NAME]: str });
    };

    useEffect(() => {
      if (isSuccess && fieldData?.data) {
        const _obj = { ...fieldData.data.data, id: fieldData.data.id };
        form.setFieldsValue(_obj);
      }
    }, [isSuccess]);

    const debounceMutate = debounce(
      (values) => mutateJob({ fieldId: fieldId, data: values }),
      2000
    );

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
              onValuesChange={(values: FormData) => {
                debounceMutate(values);
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
                    <CSButton
                      type="default"
                      onClick={() => handleModal(data.data.mapperName)}
                    >
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
                    <CSTextarea placeholder="Side Notes" rows={7} />
                  </CSFormItem>
                  <div className="option-bar">
                    <CSButton
                      type="default"
                      onClick={() => handleModal("siteNote")}
                    >
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
              {/* <CSButton
                htmlType="submit"
                type="primary"
                style={{ marginTop: 10 }}
              >
                Save Field
              </CSButton> */}
            </Form>
            <CSReferenceSidebar
              drawerProps={{
                title: "References",
                placement: "right",
                onClose: () =>
                  removeQuery(QUERY_STRING.OTHER_PARAMS.REFERENCE_NAME),
                open: Boolean(reference),
                getContainer: false,
                width: "85%",
                destroyOnClose: true,
                maskClosable: false,
              }}
              setValue={(str: string) => {
                debugger;
                let val = form.getFieldsValue() ?? {};
                const _ref = val?.[reference] ?? "";
                val = {
                  ...val,
                  [reference]: _ref?.concat(_ref === "" ? "" : "\n \n", str),
                };
                form.setFieldsValue(val);
                removeQuery([QUERY_STRING.OTHER_PARAMS.REFERENCE_NAME]);
                debounceMutate(val);
              }}
            />
          </div>
        )}
      </Spin>
    );
  }
);

export default CSDynamicFieldsRenderer;
