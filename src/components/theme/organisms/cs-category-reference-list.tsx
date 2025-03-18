import { Menu, Spin } from "antd";
import { FormFieldType } from "../../../utils/enum/general.enum";
import useGetApi from "../../../hooks/use-get-api";
import { IApiResponse } from "../../../utils/interface/response.interface";
import { getItem } from "../../../utils/helper/general.helper";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import { ItemType } from "antd/es/menu/interface";
import { useEffect, useState } from "react";
import { MenuInfo } from "rc-menu/lib/interface";

export interface ICSCategoryReferenceList {
  type: FormFieldType;
  selectedField: string;
  onSelect: (val: any) => void;
}

const CSCategoryReferenceList = (props: ICSCategoryReferenceList) => {
  const [references, setReferences] = useState<{ [key: string]: ItemType }>();
  const [referenceList, setReferenceList] = useState<ItemType[]>([]);

  const { data, isLoading } = useGetApi<IApiResponse<any[]>>({
    key: [
      API_ROUTES.reference.categoryWithReference(props.selectedField),
      props.selectedField,
    ],
    url: API_ROUTES.reference.categoryWithReference(props.selectedField),
    enabled: [FormFieldType.SENTENCE, FormFieldType.INPUT].includes(props.type),
  });

  useEffect(() => {
    if (data?.data && !isLoading) {
      const serializeData = data.data.reduce((acc, item) => {
        item.Responses.forEach((response: any) => {
          acc[response.id] = response;
        });
        return acc;
      }, {});
      setReferences(serializeData);
      setReferenceList(() =>
        data.data.map((item) =>
          getItem({
            key: item.id,
            label: item.name,
            icon: null,
            children: item.Responses.map((x: any) =>
              getItem({
                key: x.id,
                label: x.name,
                icon: null,
              })
            ),
          })
        )
      );
    }
  }, [props.selectedField, isLoading]);

  const handleClick = (key: MenuInfo) => {
    const _reference = references?.[key.key];
    props.onSelect(_reference);
  };

  return (
    referenceList?.length > 0 &&
    [FormFieldType.SENTENCE, FormFieldType.INPUT].includes(props.type) && (
      <div className="cs-category-reference-list">
        <Spin spinning={isLoading}>
          <Menu
            onClick={handleClick}
            title="References"
            style={{ width: 250 }}
            items={referenceList}
            mode="inline"
          />
        </Spin>
      </div>
    )
  );
};

export default CSCategoryReferenceList;
