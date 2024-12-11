import { Empty, Form, List, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import usePostApi from "../../../hooks/use-post-api";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import useGetApi from "../../../hooks/use-get-api";
import { IJobFormResponse } from "../../screen/jobs/new-job";
import { IApiResponse } from "../../../utils/interface/response.interface";
import CSFormItem from "../atoms/cs-form-item";
import CSSelect from "../atoms/cs-select";

export interface ICSNewJobModal {
  open: boolean;
  onCancel: () => void;
}

const CSNewJobModal = (props: ICSNewJobModal) => {
  const navigate = useNavigate();

  const { data: formList, isLoading: formListLoading } = useGetApi<
    IApiResponse<IJobFormResponse[]>
  >({
    key: [API_ROUTES.jobs.getForms],
    url: API_ROUTES.jobs.getForms,
    enabled: props.open,
  });

  const { mutate: mutateJob, isPending: jobLoading } = usePostApi<
    { name: string; formId: number },
    { id: string }
  >({
    url: API_ROUTES.jobs.post,
    onSuccess: (data) => {
      navigate(`/jobs/${data.data.id}`);
    },
  });
  return (
    <Modal
      open={props.open}
      closable={true}
      footer={false}
      title="Create New Job"
      maskClosable={false}
      centered
      onCancel={props.onCancel}
      destroyOnClose
    >
      <Form>
        <CSFormItem name={"customerId"}>
          <CSSelect showSearch allowClear />
        </CSFormItem>
      </Form>
      <List bordered loading={formListLoading || jobLoading}>
        {formList?.data?.length ? (
          formList?.data.map((_form, index: number) => (
            <List.Item
              key={_form.id.toString() + index.toString()}
              style={{ cursor: "pointer" }}
              onClick={() => mutateJob({ formId: +_form.id, name: _form.name })}
            >
              <strong>{_form.name}</strong>
            </List.Item>
          ))
        ) : (
          <Empty description="No Forms Found" />
        )}
      </List>
    </Modal>
  );
};

export default CSNewJobModal;
