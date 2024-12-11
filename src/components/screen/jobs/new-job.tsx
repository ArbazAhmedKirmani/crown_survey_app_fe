import { lazy, Suspense, useRef } from "react";
import { useParams } from "react-router-dom";
import usePostApi from "../../../hooks/use-post-api";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import CSButton from "../../theme/atoms/cs-button";
import CSFormSlidingList, {
  TCSFormSlidingListProp,
} from "../../theme/organisms/cs-form-sliding-list";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import useGetApi from "../../../hooks/use-get-api";
import { IApiResponse } from "../../../utils/interface/response.interface";
import useQueryString from "../../../hooks/use-query-string";
import useJobStore from "../../../store/job.store";
import { CheckCircleFilled } from "@ant-design/icons";
import CSLayoutLoader from "../../theme/molecules/cs-layout-loader";

const CSDynamicFieldsRenderer = lazy(
  () => import("../../theme/organisms/cs-dynamic-fields-renderer")
);

export interface IJobFormResponse {
  id: number | string;
  name: string;
  prefix: string;
}

export interface IJobSectionList {
  form: {
    id: number;
    FormSections: IJobFormResponse[];
  };
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
  const fieldRef = useRef<{ formValue: any }>();
  const { getQuery, setQuery } = useQueryString();
  const { job } = useJobStore();

  const { isPending } = usePostApi({
    url: API_ROUTES.form.post,
    showSuccessMessage: true,
    onSuccess: () => {},
  });

  const section = getQuery(QUERY_STRING.OTHER_PARAMS.CHILD_FORM) as string;
  const selectedField = getQuery(
    QUERY_STRING.OTHER_PARAMS.SELECTED_FIELD
  ) as string;

  const { data: sections, isLoading: sectionLoading } = useGetApi<
    IApiResponse<IJobSectionList>
  >({
    key: [API_ROUTES.jobs.getForms, param?.id],
    url: API_ROUTES.jobs.getSectionByForm(param?.id),
    enabled: Boolean(param?.id && param?.id !== "new"),
    onSuccess: (data) => {
      setQuery({
        [QUERY_STRING.OTHER_PARAMS.PARENT_FORM]: data.data.form.id.toString(),
      });
    },
  });

  const { data: fields, isLoading: fieldsLoading } = useGetApi<
    IApiResponse<IJobFormResponse[]>
  >({
    key: [API_ROUTES.jobs.getForms, section],
    url: API_ROUTES.jobs.getFieldsBySection(section, param?.id),
    enabled: Boolean(section && param?.id),
  });

  const handleFormSelect = (item: TCSFormSlidingListProp) => {
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
              list={sections?.data?.form?.FormSections}
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
          {selectedField && (
            <Suspense fallback={<CSLayoutLoader type="dashboard" />}>
              <CSDynamicFieldsRenderer
                ref={fieldRef}
                title="Sections Fields"
                values={job}
              />
            </Suspense>
          )}
        </div>
      </div>
      <CSButton loading={isPending} type="primary">
        Publish
      </CSButton>
    </div>
  );
};

export default NewJob;
