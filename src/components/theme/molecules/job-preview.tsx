import { Collapse, Drawer, Modal, theme, Typography } from "antd";
import { useState } from "react";
import useGetApi from "../../../hooks/use-get-api";
import { IApiResponse } from "../../../utils/interface/response.interface";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import { useParams } from "react-router-dom";
import CSButton from "../atoms/cs-button";
import { CaretRightOutlined } from "@ant-design/icons";

export interface IJobPreview {
  btnText?: string;
}

const JobPreview = (props: IJobPreview) => {
  const { btnText = "Preview" } = props;
  const { token } = theme.useToken();
  const param = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const { data, isLoading } = useGetApi<IApiResponse<any>>({
    key: [API_ROUTES.jobs.getPreview(param.id!), param.id],
    url: API_ROUTES.jobs.getPreview(param.id!),
    enabled: Boolean(open && param.id),
  });

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="job-preview-page">
      <CSButton onClick={toggleOpen}>{btnText}</CSButton>
      <Drawer
        title={
          <Typography.Title level={4} style={{ margin: 0 }}>
            Job Preview
          </Typography.Title>
        }
        open={open}
        footer={false}
        loading={isLoading}
        // onOk={toggleOpen}
        closable
        onClose={toggleOpen}
        // centered
        width={"100vw"}
        height={"100vh"}
        placement="bottom"
      >
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          items={data?.data?.form?.FormSections?.map((item: any) => ({
            key: item.id,
            label: item.prefix + " - " + item.name,
            children: item?.FormField?.map((x: any) => {
              // debugger;
              return (
                <div key={x.id} style={{ margin: "25px 0" }}>
                  <h4 style={{ margin: 2 }}>{x.name}</h4>
                  <p style={{ margin: 2 }}>
                    {x.JobFields?.[0]?.data?.[x.mapperName] || "(Empty)"}
                  </p>
                </div>
              );
            }),
            style: panelStyle,
          }))}
        />
      </Drawer>
    </div>
  );
};

export default JobPreview;
