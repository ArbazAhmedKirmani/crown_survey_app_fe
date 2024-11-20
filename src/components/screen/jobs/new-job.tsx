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
import useQueryString from "../../../hooks/use-query-string";
import CSDynamicFieldsRenderer from "../../theme/organisms/cs-dynamic-fields-renderer";

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
  const { getQuery, setQuery } = useQueryString();

  const { isPending } = usePostApi({
    url: API_ROUTES.form.post,
    showSuccessMessage: true,
    onSuccess: () => {},
  });

  const form = getQuery(QUERY_STRING.OTHER_PARAMS.PARENT_FORM) as string;
  const section = getQuery(QUERY_STRING.OTHER_PARAMS.CHILD_FORM) as string;

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

  const handleFormSelect = (item: TCSFormSlidingListProp) => {
    // setQuery({ [QUERY_STRING.OTHER_PARAMS.PARENT_FORM]: item.id.toString() });
    setQuery({ [QUERY_STRING.OTHER_PARAMS.CHILD_FORM]: item.id.toString() });
  };

  const handleSectionSelect = (item: TCSFormSlidingListProp) => {
    setQuery({
      [QUERY_STRING.OTHER_PARAMS.SELECTED_FIELD]: item.id.toString(),
    });
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
        {sections?.data && (
          <div className="second-list">
            <CSFormSlidingList
              loading={fieldsLoading}
              type={QUERY_STRING.OTHER_PARAMS.CHILD_FORM}
              list={fields?.data}
              onSelect={handleSectionSelect}
              title="Sections"
            />
          </div>
        )}
        <div className="content-section">
          <CSDynamicFieldsRenderer title="Sections Fields" />
        </div>
      </div>
      <CSButton loading={isPending} type="primary">
        {checkEditablePage(param?.id, "Submit Job", "Update Job")}
      </CSButton>
    </div>
  );
};

export default NewJob;
