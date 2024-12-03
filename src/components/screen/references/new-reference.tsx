import { useEffect, useState } from "react";
import CSButton from "../../theme/atoms/cs-button";
import { Form, Modal, Spin } from "antd";
import CSInput from "../../theme/atoms/cs-input";
import CSFormItem from "../../theme/atoms/cs-form-item";
import { useForm } from "antd/es/form/Form";
import CSTextarea from "../../theme/atoms/cs-textarea";
import CSSelect from "../../theme/atoms/cs-select";
import usePostApi from "../../../hooks/use-post-api";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import useGetApi from "../../../hooks/use-get-api";
import { IApiResponse } from "../../../utils/interface/response.interface";
import { AnyObject } from "antd/es/_util/type";
import CSCheckbox from "../../theme/atoms/cs-checkbox";
import { useParams } from "react-router-dom";
import { checkEditablePage } from "../../../utils/helper/general.helper";

const NewReference = () => {
  const [categoryForm] = useForm();
  const [form] = useForm();
  const params = useParams();
  const [category, setCategory] = useState<boolean>(false);

  const handleCatgory = () => {
    setCategory((prev) => !prev);
  };

  const handleCategorySubmit = (values: FormData) => {
    mutateCategory(values);
  };

  /** GET Reference Category API */
  const {
    data: categoryData,
    isLoading: categoryLoading,
    refetch,
  } = useGetApi<IApiResponse<{ id: string; name: string }[]>>({
    key: [API_ROUTES.reference.getCategory],
    url: API_ROUTES.reference.getCategory,
  });

  /** GET Reference API */
  const { data, isLoading, isSuccess } = useGetApi<IApiResponse<AnyObject>>({
    key: [API_ROUTES.reference.getById(params.id!), params.id],
    url: API_ROUTES.reference.getById(params.id!),
    enabled: Boolean(params?.id !== "new"),
  });

  /** POST Reference API */
  const { mutate, isPending } = usePostApi({
    url: API_ROUTES.reference.post,
    showSuccessMessage: true,
    onSuccess: () => {
      form.resetFields();
    },
  });

  /** PUT Reference API */
  const { mutate: updateMutate, isPending: updatePending } = usePostApi({
    url: API_ROUTES.reference.post,
    showSuccessMessage: true,
    onSuccess: () => {},
  });

  /** POST Reference Category API */
  const { mutate: mutateCategory, isPending: categoryPending } = usePostApi({
    url: API_ROUTES.reference.postCategory,
    showSuccessMessage: true,
    onSuccess: () => {
      categoryForm.resetFields();
      refetch();
      handleCatgory();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue(data.data);
      data.data;
    }
  }, [isSuccess]);

  const submitReference = (values: FormData) => {
    params?.id !== "new" ? updateMutate(values) : mutate(values);
  };

  return (
    <div className="reference">
      <div className="category">
        <CSButton onClick={handleCatgory}>Add Category</CSButton>
      </div>
      <div className="ref-form">
        <Spin spinning={isLoading}>
          <Form form={form} layout="vertical" onFinish={submitReference}>
            <CSFormItem
              label="Name"
              name={"name"}
              rules={[{ required: true, message: "Name is required" }]}
            >
              <CSInput placeholder="Name" />
            </CSFormItem>
            <CSFormItem
              label="Category"
              name={"categoryId"}
              rules={[{ required: true, message: "Category is required" }]}
            >
              <CSSelect
                placeholder="Category"
                loading={categoryLoading}
                options={categoryData?.data?.map((x) => ({
                  label: x.name,
                  value: x.id,
                }))}
              />
            </CSFormItem>
            <CSFormItem
              label="Description"
              name={"value"}
              rules={[{ required: true, message: "Description is required" }]}
            >
              <CSTextarea rows={4} placeholder="Referece Description" />
            </CSFormItem>
            <CSFormItem name={"isSiteNote"} valuePropName="checked">
              <CSCheckbox>Include in Site Note.</CSCheckbox>
            </CSFormItem>

            <CSButton
              type="primary"
              htmlType="submit"
              loading={isPending || updatePending}
            >
              {checkEditablePage(
                params?.id,
                "Create Reference",
                "Update Reference"
              )}
            </CSButton>
          </Form>
        </Spin>
      </div>
      <Modal
        rootClassName="new-reference"
        footer={null}
        open={category}
        onCancel={handleCatgory}
        title={"New Reference Category"}
        style={{ padding: 0 }}
      >
        <Form
          form={categoryForm}
          onFinish={handleCategorySubmit}
          layout="vertical"
        >
          <div className="new-reference">
            <CSFormItem
              label="Category Name"
              name={"name"}
              rules={[{ required: true, message: "Category name is required" }]}
            >
              <CSInput placeholder="Category Name" />
            </CSFormItem>
            <CSButton
              htmlType="submit"
              type="primary"
              loading={categoryPending}
            >
              Save
            </CSButton>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default NewReference;
