import { useEffect, useState } from "react";
import CSButton from "../../theme/atoms/cs-button";
import {
  ColorPicker,
  Form,
  List,
  Modal,
  Popconfirm,
  Spin,
  Typography,
} from "antd";
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
import { useNavigate, useParams } from "react-router-dom";
import { checkEditablePage } from "../../../utils/helper/general.helper";
import { DeleteFilled } from "@ant-design/icons";
import { AxiosMethodEnum } from "../../../utils/enum/general.enum";
import CSSearchSelect from "../../theme/atoms/cs-search-select";

const NewReference = () => {
  const [categoryForm] = useForm();
  const [form] = useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<boolean>(false);
  const [deleteCategoryId, setdeleteCategoryId] = useState<string>();

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
    url: API_ROUTES.reference.put(params.id!),
    showSuccessMessage: true,
    onSuccess: () => {
      navigate(-1);
    },
    method: AxiosMethodEnum.PUT,
  });

  /** PUT Reference API */
  const { mutate: deleteCategory, isPending: deleteCategoryPending } =
    usePostApi({
      url: API_ROUTES.reference.deleteCategory(deleteCategoryId!),
      showSuccessMessage: true,
      onSuccess: () => {
        setdeleteCategoryId(undefined);
        refetch();
      },
      method: AxiosMethodEnum.DELETE,
    });

  /** POST Reference Category API */
  const { mutate: mutateCategory, isPending: categoryPending } = usePostApi({
    url: API_ROUTES.reference.postCategory,
    showSuccessMessage: true,
    onSuccess: () => {
      categoryForm.resetFields();
      refetch();
      // handleCatgory();
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
            <CSFormItem name={"id"} hidden={true}>
              <input type="hidden" />
            </CSFormItem>
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
                showSearch
                placeholder="Category"
                loading={categoryLoading}
                options={categoryData?.data?.map((x) => ({
                  label: x.name,
                  value: x.id,
                }))}
                filterOption={(input, option) =>
                  option?.label && typeof option?.label === "string"
                    ? option.label.toLowerCase().includes(input.toLowerCase())
                    : false
                }
              />
            </CSFormItem>
            <CSFormItem
              label="Description"
              name={"value"}
              rules={[{ required: true, message: "Description is required" }]}
            >
              <CSTextarea
                rows={4}
                placeholder="Reference Description -  use { } for single option selection, and [ ] for multiple option selection ::: use ( , ) as value seperator"
              />
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

      {/* Category Form Modal */}
      <Modal
        rootClassName="new-reference"
        footer={null}
        open={category}
        onCancel={handleCatgory}
        title={"New Reference Category"}
        style={{ padding: 0 }}
        centered
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
              <CSInput placeholder="Enter Category Name" />
            </CSFormItem>
            <CSSearchSelect
              url={API_ROUTES.jobs.getAllFields}
              formFieldProps={{
                label: "Field",
                name: "fieldId",
                rules: [{ required: true, message: "Field is required" }],
              }}
              selectProps={{
                fieldNames: {
                  label: "name",
                  value: "id",
                },
                placeholder: "Select Field",
              }}
            />
            <CSFormItem label="Color" name={"color"}>
              <ColorPicker size="small" allowClear showText />
            </CSFormItem>
            <CSButton
              htmlType="submit"
              type="primary"
              loading={categoryPending}
            >
              Save
            </CSButton>
            <Typography.Title level={5}>Category List</Typography.Title>
            <div className="category-list">
              <List
                loading={deleteCategoryPending || categoryLoading}
                renderItem={(item: any, index: number) => (
                  <div
                    className="category-list-item"
                    key={item.id + index.toString()}
                  >
                    <p>{item.name}</p>
                    <span>
                      <Popconfirm
                        title="Delete"
                        onConfirm={() => {
                          setdeleteCategoryId(item.id);
                          deleteCategory(item);
                        }}
                        description="Do you really want to delete?"
                      >
                        <DeleteFilled />
                      </Popconfirm>
                    </span>
                  </div>
                )}
                dataSource={categoryData?.data}
              ></List>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default NewReference;
