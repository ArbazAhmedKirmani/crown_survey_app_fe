import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Divider, Form, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { UploadFile } from "antd/lib";
import { useNavigate, useParams } from "react-router-dom";
import CSButton from "../../theme/atoms/cs-button";
const CSFormDetail = lazy(() => import("../../theme/organisms/cs-form-detail"));
const CSFormSectionDetail = lazy(
  () => import("../../theme/organisms/cs-form-section-detail")
);
import { AnyObject } from "antd/lib/_util/type";
import usePostApi from "../../../hooks/use-post-api";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import useGetApi from "../../../hooks/use-get-api";
import { formMapper } from "../../../utils/helper/mapper.helper";
import { IFormGetById } from "../../../utils/interface/form.interface";
import { IApiResponse } from "../../../utils/interface/response.interface";
import { AxiosMethodEnum } from "../../../utils/enum/general.enum";
import { checkEditablePage } from "../../../utils/helper/general.helper";
import { QueryClient } from "react-query";
import CSLayoutLoader from "../../theme/molecules/cs-layout-loader";

export type TFormField =
  | "CHECKBOX"
  | "INPUT"
  | "SENTENCE"
  | "RADIO"
  | "DATE"
  | "FILE";

export interface IFormFields {
  name: string;
  mapperName: string;
  orderNo: number;
  has_attachment: boolean;
  type: TFormField;
  reference: boolean;
  required: boolean;
  rating: boolean;
  placeholder: string;
  values: string;
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
  const navigate = useNavigate();
  const document_ref = useRef<AnyObject>();
  const [getForm, setGetForm] = useState(false);
  const queryClient = new QueryClient();

  const { mutate: saveForm, isPending: savePending } = usePostApi({
    url: API_ROUTES.form.post,
    showSuccessMessage: true,
    method: AxiosMethodEnum.POST,
    onSuccess: () => {
      navigate("/forms/");
    },
  });

  const { mutate: updateForm, isPending: updatePending } = usePostApi({
    url: API_ROUTES.form.put(params.id!),
    method: AxiosMethodEnum.PATCH,
    showSuccessMessage: true,
    onSuccess: () => {
      navigate(-1);
    },
  });

  const { data, isLoading, isSuccess, refetch } = useGetApi<
    IApiResponse<IFormGetById>
  >({
    key: [API_ROUTES.form.getById(params.id!)],
    url: API_ROUTES.form.getById(params.id!),
    enabled: getForm,
    options: {
      gcTime: 0,
      staleTime: 0,
    },
  });

  const onFinish = (values: INewForm) => {
    if (params.id === "new")
      saveForm({
        ...values,
        form_document: document_ref.current?.getValue(),
      });
    else
      updateForm({
        ...values,
        form_document: document_ref.current?.getValue(),
      });
  };

  useEffect(() => {
    if (params?.id !== "new" && !isSuccess) {
      refetch();
      setGetForm(true);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const result = formMapper(data.data);
      form.setFieldsValue(result);
      document_ref.current?.setValue({
        ...data.data.document,
        name: data.data.document.originalName,
      });
    }
    return () => {
      queryClient.removeQueries({
        queryKey: [API_ROUTES.form.getById(params.id!)],
        exact: true,
      });
    };
  }, [isSuccess]);

  return (
    <Spin spinning={isLoading}>
      <div className="new-form">
        <Form
          layout="vertical"
          className="dynamic-form"
          name="dynamicForm"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
          scrollToFirstError
        >
          <Suspense fallback={<CSLayoutLoader type="auth" />}>
            <CSFormDetail document_ref={document_ref} />
          </Suspense>

          <Divider />

          <Suspense fallback={<CSLayoutLoader type="auth" />}>
            <CSFormSectionDetail />
          </Suspense>
          <Divider />

          <div className="submit-btn">
            <Form.Item>
              <CSButton
                type="primary"
                htmlType="submit"
                loading={savePending || updatePending}
              >
                {checkEditablePage(params?.id, "Create Form", "Update Form")}
              </CSButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default NewForm;
