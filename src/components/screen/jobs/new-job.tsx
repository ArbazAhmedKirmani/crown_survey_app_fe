import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import CSButton from "../../theme/atoms/cs-button";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import useGetApi from "../../../hooks/use-get-api";
import { IApiResponse } from "../../../utils/interface/response.interface";
import useQueryString from "../../../hooks/use-query-string";
import useJobStore from "../../../store/job.store";
import { FilePdfOutlined } from "@ant-design/icons";
import CSLayoutLoader from "../../theme/molecules/cs-layout-loader";
import { AxiosMethodEnum } from "../../../utils/enum/general.enum";
import CSJobStatus from "../../theme/molecules/cs-job-status";
import { APP_CONSTANTS } from "../../../utils/constants/app.constant";
import JobPreview from "../../theme/molecules/job-preview";
import CSJobFieldPagination from "../../theme/molecules/cs-job-field-pagination";
const CSFormSectionMenu = lazy(
  () => import("../../theme/organisms/cs-form-section-menu")
);

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
  const { job } = useJobStore();
  const { getQuery, setQuery } = useQueryString();

  const [index, setIndex] = useState<number>(0);
  const [pdfDownload, setPdfDownload] = useState<boolean>(false);

  // const parentForm = getQuery(QUERY_STRING.OTHER_PARAMS.PARENT_FORM) as string;
  const section = getQuery(QUERY_STRING.OTHER_PARAMS.CHILD_FORM) as string;
  const selectedField = getQuery(
    QUERY_STRING.OTHER_PARAMS.SELECTED_FIELD
  ) as string;

  const { data: sections } = useGetApi<IApiResponse<IJobSectionList>>({
    key: [API_ROUTES.jobs.getForms, param?.id],
    url: API_ROUTES.jobs.getSectionByForm(param?.id),
    enabled: Boolean(param?.id && param?.id !== "new"),
    onSuccess: (data) => {
      setQuery({
        [QUERY_STRING.OTHER_PARAMS.PARENT_FORM]: data.data.form.id.toString(),
      });
    },
  });

  const { data: fields } = useGetApi<IApiResponse<IJobFormResponse[]>>({
    key: [API_ROUTES.jobs.getForms, section],
    url: API_ROUTES.jobs.getFieldsBySection(section, param?.id),
    enabled: Boolean(section && param?.id),
  });

  const downloadPdf = async () => {
    try {
      setPdfDownload(true);
      const token = localStorage.getItem(APP_CONSTANTS.AUTH.AUTH_TOKEN);
      const response = await fetch(
        APP_CONSTANTS.API.BASE_URL + API_ROUTES.jobs.generateForm(param.id),
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

  useEffect(() => {
    if (fields?.data?.length) {
      setIndex(fields?.data?.findIndex((x) => x.id === selectedField));
    }
  }, [fields?.data]);

  return (
    <div className="new-job-cont">
      {sections?.data && (
        <div className="first-list">
          <CSFormSectionMenu
            setIndex={(key: string) => {
              setIndex(fields?.data?.findIndex((x) => x.id === key) ?? 0);
            }}
          />
        </div>
      )}
      <div className="flex-cont">
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

        {/* Job Footer */}
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
            <CSJobFieldPagination
              data={fields?.data}
              index={index}
              setIndex={setIndex}
            />
            <CSJobStatus />
            <JobPreview />
            <CSButton
              size="middle"
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
    </div>
  );
};

export default NewJob;
