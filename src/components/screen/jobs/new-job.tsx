import { useParams } from "react-router-dom";
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
import { useState } from "react";
import CSDynamicFieldsRenderer, {
  IFormFieldResponse,
} from "../../theme/organisms/cs-dynamic-fields-renderer";

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
  const [selectedForm, setSelectedForm] = useState<string>();
  const [selectedSection, setSelectedSection] = useState<string>();

  const { isPending } = usePostApi({
    url: API_ROUTES.form.post,
    showSuccessMessage: true,
    onSuccess: () => {},
  });

  const { data, isLoading: formLoading } = useGetApi<
    IApiResponse<IJobFormResponse[]>
  >({
    key: [API_ROUTES.jobs.getForms],
    url: API_ROUTES.jobs.getForms,
  });

  const { data: sections, isLoading: sectionLoading } = useGetApi<
    IApiResponse<IJobFormResponse[]>
  >({
    key: [API_ROUTES.jobs.getForms, selectedForm],
    url: API_ROUTES.jobs.getSectionByForm(selectedForm),
    enabled: Boolean(selectedForm),
  });

  const { data: fields, isLoading: fieldsLoading } = useGetApi<
    IApiResponse<IFormFieldResponse[]>
  >({
    key: [API_ROUTES.jobs.getForms, selectedSection],
    url: API_ROUTES.jobs.getFieldsBySection(selectedSection),
    enabled: Boolean(selectedSection),
  });

  const handleFormSelect = (item: TCSFormSlidingListProp) => {
    setSelectedForm(item.id.toString());
  };

  const handleSectionSelect = (item: TCSFormSlidingListProp) => {
    setSelectedSection(item.id.toString());
  };

  return (
    <div className="new-job-cont">
      <div className="flex-cont">
        <div className="first-list">
          <CSFormSlidingList
            loading={formLoading}
            type={QUERY_STRING.OTHER_PARAMS.PARENT_FORM}
            list={data?.data}
            onSelect={handleFormSelect}
          />
        </div>
        <div className="second-list">
          <CSFormSlidingList
            loading={sectionLoading}
            type={QUERY_STRING.OTHER_PARAMS.CHILD_FORM}
            list={sections?.data}
            onSelect={handleSectionSelect}
          />
        </div>
        <div className="content-section">
          <CSDynamicFieldsRenderer
            list={fields?.data}
            loading={fieldsLoading}
          />
        </div>
      </div>
      <CSButton loading={isPending} type="primary">
        {checkEditablePage(param?.id, "Submit Job", "Update Job")}
      </CSButton>
    </div>
  );
};

export default NewJob;
