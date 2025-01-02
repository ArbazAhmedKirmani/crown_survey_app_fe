import { lazy, Suspense, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
import { CheckCircleFilled, FilePdfOutlined } from "@ant-design/icons";
import CSLayoutLoader from "../../theme/molecules/cs-layout-loader";
import { AxiosMethodEnum } from "../../../utils/enum/general.enum";
import CSJobStatus from "../../theme/molecules/cs-job-status";
import { APP_CONSTANTS } from "../../../utils/constants/app.constant";

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
  const [pdfDownload, setPdfDownload] = useState<boolean>(false);

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

  const downloadPdf = async () => {
    try {
      setPdfDownload(true);
      const token = localStorage.getItem(APP_CONSTANTS.AUTH.AUTH_TOKEN);
      const response = await fetch(
        APP_CONSTANTS.API.BASE_URL + API_ROUTES.jobs.generatePdf(param.id),
        {
          method: AxiosMethodEnum.GET,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response?.ok) {
        throw new Error("Failed to fetch PDF");
      }

      const blob = await response?.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      // link.setAttribute("download");
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
      setPdfDownload(false);
    } catch (error) {
      console.error("Error downloading the PDF:", error);
      setPdfDownload(false);
    }
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
      <div className="job-footer">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <CSJobStatus />
          <CSButton
            size="large"
            icon={<FilePdfOutlined />}
            type="primary"
            onClick={downloadPdf}
            loading={pdfDownload}
          >
            Publish Doc.
          </CSButton>
        </div>
      </div>
    </div>
  );
};

export default NewJob;
