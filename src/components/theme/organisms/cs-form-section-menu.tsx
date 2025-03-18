import { Menu, Spin } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useGetApi from "../../../hooks/use-get-api";
import { IApiResponse } from "../../../utils/interface/response.interface";

import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import useQueryString from "../../../hooks/use-query-string";
import { getItem } from "../../../utils/helper/general.helper";
import { CheckCircleFilled } from "@ant-design/icons";

interface ICSFormSectionList {
  setIndex: any;
}

const CSFormSectionMenu = (props: ICSFormSectionList) => {
  const param = useParams();
  const { setQuery, removeQuery } = useQueryString();
  const [list, setList] = useState<any[]>();

  const { isLoading } = useGetApi<IApiResponse<any>>({
    key: [API_ROUTES.jobs.sectionFields(""), param.id],
    url: API_ROUTES.jobs.sectionFields(param.id!),
    enabled: Boolean(param.id),
    onSuccess: (data) => {
      setList(() => {
        return data.data.form.FormSections.map((item: any) => {
          return getItem({
            key: item.id,
            label: item.name,
            icon: <span style={{ fontWeight: "bold" }}>{item.prefix}</span>,
            onTitleClick: (key) => {
              setQuery({ [QUERY_STRING.OTHER_PARAMS.CHILD_FORM]: key.key });
              removeQuery(QUERY_STRING.OTHER_PARAMS.SELECTED_FIELD);
            },
            children: item?.FormField?.map((x: any) =>
              getItem({
                key: x.id,
                label: x.name,
                icon: (
                  <span style={{ fontWeight: "bold" }}>
                    {x?.JobFields.length > 0 && (
                      <CheckCircleFilled
                        style={{ fontSize: "x-small", color: "green" }}
                      />
                    )}
                    {x.prefix}
                  </span>
                ),
              })
            ),
          });
        });
      });
    },
  });

  return (
    <div className="cs-form-section-menu">
      <Spin spinning={isLoading}>
        <Menu
          mode="inline"
          items={list}
          onClick={(e) => {
            setQuery({
              [QUERY_STRING.OTHER_PARAMS.SELECTED_FIELD]: e.key,
            });
            props.setIndex(e.key);
          }}
        />
      </Spin>
    </div>
  );
};

export default CSFormSectionMenu;
