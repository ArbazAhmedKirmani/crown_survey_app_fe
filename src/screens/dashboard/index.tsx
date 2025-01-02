import { Card, Col, Row, Statistic, Typography } from "antd";
import useGetApi from "../../hooks/use-get-api";
import { API_ROUTES } from "../../utils/constants/api-routes.constant";
import { IApiResponse } from "../../utils/interface/response.interface";
import { valueType } from "antd/es/statistic/utils";
import PendingJobSvg from "../../assets/images/data-pending.png";
import CompletedJobSvg from "../../assets/images/order-completed.png";

const DashboardScreen = () => {
  const { data: pendingJobData, isLoading: pendingJobLoading } = useGetApi<
    IApiResponse<{ count: valueType }>
  >({
    key: [API_ROUTES.report.pendingJobs],
    url: API_ROUTES.report.pendingJobs,
  });

  const { data: completedJobData, isLoading: completedJobLoading } = useGetApi<
    IApiResponse<{ count: valueType }>
  >({
    key: [API_ROUTES.report.monthlyCompletedJobs],
    url: API_ROUTES.report.monthlyCompletedJobs,
  });

  const getImage = (src: any) => (
    <img src={src} height={25} width={25} style={{ marginRight: 10 }} />
  );

  return (
    <div>
      <Typography.Title level={4}>Dashboard Screen</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xl={6} lg={8} md={12} xs={24}>
          <Card bordered={false}>
            <Statistic
              title="All Pending Jobs"
              value={pendingJobData?.data?.count}
              precision={0}
              valueStyle={{ color: "golden" }}
              prefix={getImage(PendingJobSvg)}
              // suffix=""
              loading={pendingJobLoading}
            />
          </Card>
        </Col>
        <Col xl={6} lg={8} md={12} xs={24}>
          <Card bordered={false}>
            <Statistic
              loading={completedJobLoading}
              title="Completed Jobs (Monthly)"
              value={completedJobData?.data?.count}
              precision={0}
              valueStyle={{ color: "green" }}
              prefix={getImage(CompletedJobSvg)}
              // suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardScreen;
