import { FloatButton, Form, Spin } from "antd";
import {
  forwardRef,
  lazy,
  Suspense,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
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
import { useForm } from "antd/es/form/Form";
import useJobStore from "../../../store/job.store";
import usePostApi from "../../../hooks/use-post-api";
import { AnyObject } from "antd/es/_util/type";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";
import CSDragger, { ICSDraggerReturn } from "../atoms/cs-dragger";
import { LoadingOutlined } from "@ant-design/icons";
import CSLayoutLoader from "../molecules/cs-layout-loader";
import CSRating from "../atoms/cs-rating";

const CSReferenceSidebar = lazy(() => import("./cs-reference-sidebar"));

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
  rating: boolean;
  links: string[];
}

export interface CSDynamicFieldsRenderer {
  title?: string;
  values: any;
}

const CSDynamicFieldsRenderer = forwardRef(
  (props: CSDynamicFieldsRenderer, ref) => {
    const mainRef = useRef<ICSDraggerReturn>();
    const noteRef = useRef<ICSDraggerReturn>();
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

    const {
      data,
      isLoading,
      isSuccess: isSuccessResponse,
    } = useGetApi<IApiResponse<IFormFieldResponse>>({
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
      showSuccessMessage: false,
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
      if (fieldData?.data?.data?.["field_attachments"]) {
        mainRef.current?.setValue(fieldData?.data?.data?.["field_attachments"]);
      }
      if (fieldData?.data?.data?.["siteNote_attachments"]) {
        noteRef.current?.setValue(
          fieldData?.data?.data?.["siteNote_attachments"]
        );
      }
    }, [isSuccess, fieldId]);

    useEffect(() => {
      if (isSuccessResponse && data?.data?.response)
        handleModal(data.data.mapperName);
    }, [isSuccessResponse]);

    const debounceMutate = debounce((val?) => {
      const main_val = mainRef.current?.getValue();
      const note_val = noteRef.current?.getValue();

      const data = val ? val : form.getFieldsValue();
      if (main_val?.length) {
        data["field_attachments"] = main_val;
      }
      if (note_val?.length) {
        data["siteNote_attachments"] = note_val;
      }
      mutateJob({ fieldId: fieldId, data });
    }, 600);

    return isLoading ? (
      <CSLayoutLoader type="dashboard" />
    ) : (
      <Spin spinning={fieldLoading}>
        {data?.data?.mapperName && (
          <div className="cs-dynamic-fields-renderer">
            {props?.title && <h3>{data.data.name}</h3>}
            <Form
              layout="vertical"
              form={form}
              style={{ width: "100%" }}
              initialValues={job?.[data.data.mapperName]}
              onValuesChange={debounceMutate}
            >
              {data.data.rating && (
                <CSFormItem
                  name={"rating"}
                  valuePropName="value"
                  style={{ width: "100%", textAlign: "right" }}
                >
                  <CSRating
                    key={data.data.id}
                    list={[
                      <div
                        className="cs-rating-list"
                        style={{
                          backgroundColor: "gray",
                        }}
                      >
                        NA
                      </div>,
                      <div
                        className="cs-rating-list"
                        style={{
                          backgroundColor: "green",
                        }}
                      >
                        1
                      </div>,
                      <div
                        className="cs-rating-list"
                        style={{
                          backgroundColor: "#fe9926",
                        }}
                      >
                        2
                      </div>,
                      <div
                        className="cs-rating-list"
                        style={{
                          backgroundColor: "red",
                        }}
                      >
                        3
                      </div>,
                    ]}
                  />
                </CSFormItem>
              )}
              <CSFormItem name={"id"} hidden>
                <input hidden />
              </CSFormItem>

              <CSDynamicField
                type={data?.data?.type}
                nestedProps={data?.data}
              />

              {data?.data?.response && (
                <div>
                  {[FormFieldType.SENTENCE, FormFieldType.INPUT].includes(
                    data?.data?.type
                  ) && (
                    <div className="option-bar">
                      <CSButton
                        type="default"
                        onClick={() => handleModal(data.data.mapperName)}
                      >
                        Add Response
                      </CSButton>

                      <CSDragger
                        ref={mainRef}
                        multiple
                        name="field_attachments"
                      />
                    </div>
                  )}
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
                      Site Note Response
                    </CSButton>

                    <CSDragger
                      ref={noteRef}
                      multiple
                      name="siteNote_attachments"
                    />
                  </div>

                  <Suspense
                    fallback={
                      <FloatButton
                        shape="circle"
                        type="primary"
                        icon={<LoadingOutlined />}
                      />
                    }
                  >
                    <CSReferenceSidebar
                      drawerProps={{
                        title: "References",
                        placement: "top",
                        onClose: () =>
                          removeQuery(QUERY_STRING.OTHER_PARAMS.REFERENCE_NAME),
                        open: Boolean(reference),
                        getContainer: false,
                        height: "100%",
                        destroyOnClose: true,
                        maskClosable: false,
                      }}
                      setValue={(str: string) => {
                        debugger;
                        let val = form.getFieldsValue() ?? {};
                        val = {
                          ...val,
                          [reference]: val[reference]
                            ? val[reference] + "\n \n" + str
                            : str,
                        };
                        form.setFieldsValue(val);
                        removeQuery([QUERY_STRING.OTHER_PARAMS.REFERENCE_NAME]);
                        debounceMutate();
                      }}
                    />
                  </Suspense>
                </div>
              )}
              {data?.data?.links?.length && (
                <div style={{ marginTop: 10 }}>
                  <label>Links</label>
                  <div style={{ display: "flex" }}>
                    {data.data.links.map((link: string, index: number) => {
                      const [url, title] = link.split("|");
                      return (
                        <a
                          key={index + title}
                          href={url}
                          className="links"
                          target="_blank"
                        >
                          {title}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </Form>
          </div>
        )}
        {jobLoading && (
          <FloatButton
            shape="circle"
            type="primary"
            icon={<LoadingOutlined />}
          />
        )}
      </Spin>
    );
  }
);

export default CSDynamicFieldsRenderer;
