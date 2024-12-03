import { useNavigate, useParams } from "react-router-dom";
import usePostApi from "../../../hooks/use-post-api";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import CSButton from "../../theme/atoms/cs-button";
import CSFormSlidingList, {
  TCSFormSlidingListProp,
} from "../../theme/organisms/cs-form-sliding-list";
import { checkEditablePage } from "../../../utils/helper/general.helper";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import useGetApi from "../../../hooks/use-get-api";
import { IApiResponse } from "../../../utils/interface/response.interface";
import useQueryString from "../../../hooks/use-query-string";
import CSDynamicFieldsRenderer from "../../theme/organisms/cs-dynamic-fields-renderer";
import { useRef, useState } from "react";
import { FormInstance, List, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import useJobStore from "../../../store/job.store";
import { CheckCircleFilled } from "@ant-design/icons";

export interface IJobFormResponse {
  id: number;
  name: string;
  prefix: string;
}

export interface IFieldData {
  prefix: string;
  name: string;
  id: string;
  type: string;
  mapper: string;
  orderNo: number;
}

const NewJob = () => {
  const param = useParams();
  const navigate = useNavigate();
  const fieldRef = useRef<{ formValue: any }>();
  const { getQuery, setQuery } = useQueryString();
  const { job, setJob } = useJobStore();

  const { isPending } = usePostApi({
    url: API_ROUTES.form.post,
    showSuccessMessage: true,
    onSuccess: () => {},
  });

  const form = getQuery(QUERY_STRING.OTHER_PARAMS.PARENT_FORM) as string;
  const section = getQuery(QUERY_STRING.OTHER_PARAMS.CHILD_FORM) as string;

  const { data: formList, isLoading: formListLoading } = useGetApi<
    IApiResponse<IJobFormResponse[]>
  >({
    key: [API_ROUTES.jobs.getForms],
    url: API_ROUTES.jobs.getForms,
  });

  const { data: sections, isLoading: sectionLoading } = useGetApi<
    IApiResponse<IJobFormResponse[]>
  >({
    key: [API_ROUTES.jobs.getForms, form],
    url: API_ROUTES.jobs.getSectionByForm(form),
    enabled: Boolean(form),
  });

  const { data: fields, isLoading: fieldsLoading } = useGetApi<
    IApiResponse<IJobFormResponse[]>
  >({
    key: [API_ROUTES.jobs.getForms, section],
    url: API_ROUTES.jobs.getFieldsBySection(section),
    enabled: Boolean(section),
  });

  const { mutate: mutateJob, isPending: jobLoading } = usePostApi<
    { name: string; formId: number },
    { id: string; formId: number }
  >({
    url: API_ROUTES.jobs.post,
    onSuccess: (data) => {
      navigate(
        `/jobs/${data.data.id}?${QUERY_STRING.OTHER_PARAMS.PARENT_FORM}=${data.data?.formId}`
      );
    },
  });

  const handleFormSelect = (item: TCSFormSlidingListProp) => {
    setQuery({ [QUERY_STRING.OTHER_PARAMS.CHILD_FORM]: item.id.toString() });
  };

  const handleSectionSelect = (item: TCSFormSlidingListProp) => {
    // if (item?.mapperName) {
    //   setJob(fieldRef.current?.formValue());
    // }
    setQuery({
      [QUERY_STRING.OTHER_PARAMS.SELECTED_FIELD]: item.id.toString(),
    });
    // console.log("job: ", job);
  };

  return (
    <div className="new-job-cont">
      <div className="flex-cont">
        {sections?.data && (
          <div className="first-list">
            <CSFormSlidingList
              loading={sectionLoading}
              type={QUERY_STRING.OTHER_PARAMS.PARENT_FORM}
              list={sections?.data}
              onSelect={handleFormSelect}
              title="Forms"
            />
          </div>
        )}
        {fields?.data && (
          <div className="second-list">
            <CSFormSlidingList
              loading={fieldsLoading}
              type={QUERY_STRING.OTHER_PARAMS.CHILD_FORM}
              list={fields?.data}
              onSelect={handleSectionSelect}
              title="Sections"
              hidePrefix
              showCustomRender={(item: TCSFormSlidingListProp) =>
                item?.JobFields?.length ? (
                  <CheckCircleFilled
                    style={{
                      color: "green",
                      fontSize: "smaller",
                      margin: "0 5px 0 0",
                    }}
                  />
                ) : (
                  <></>
                )
              }
            />
          </div>
        )}
        <div className="content-section">
          <CSDynamicFieldsRenderer
            ref={fieldRef}
            title="Sections Fields"
            values={job}
          />
        </div>
      </div>
      <CSButton loading={isPending} type="primary">
        {checkEditablePage(param?.id, "Submit Job", "Update Job")}
      </CSButton>

      <Modal
        open={!form}
        closable={false}
        footer={false}
        title="Select Form"
        centered
      >
        <List bordered loading={formListLoading || jobLoading}>
          {formList?.data.map((_form, index: number) => (
            <List.Item
              key={_form.id + index}
              style={{ cursor: "pointer" }}
              onClick={() => mutateJob({ formId: _form.id, name: _form.name })}
            >
              {/* <strong style={{ width: 40 }}>{_form.prefix}</strong> -{" "} */}
              <strong>{_form.name}</strong>
            </List.Item>
          ))}
        </List>
      </Modal>
    </div>
  );
};

export default NewJob;
