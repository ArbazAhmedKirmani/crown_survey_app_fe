import { Drawer, DrawerProps } from "antd";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import useQueryString from "../../../hooks/use-query-string";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import useGetApi from "../../../hooks/use-get-api";
import { IApiResponse } from "../../../utils/interface/response.interface";
import CSFormSlidingList from "./cs-form-sliding-list";
import { CloseOutlined } from "@ant-design/icons";
import {
  extractArrays,
  extractObject,
  replaceSelectedItem,
} from "../../../utils/helper/general.helper";
import CSCheckbox from "../atoms/cs-checkbox";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import CSButton from "../atoms/cs-button";
import CSRenderSentence from "../molecules/cs-render-sentence";

export interface ICSReferenceSidebar extends PropsWithChildren {
  drawerProps: DrawerProps;
}

const CSReferenceSidebar = (props: ICSReferenceSidebar) => {
  const { getQuery } = useQueryString();
  const [reference, setReference] = useState<
    ({ id: string; name: string; value: string } | undefined)[]
  >([]);

  const [finalReference, setFinalReference] = useState({});

  const controller = new AbortController();
  const selectedRefernce = getQuery(
    QUERY_STRING.OTHER_PARAMS.SELECTED_REFERENCE
  );
  const refernceId = getQuery(QUERY_STRING.OTHER_PARAMS.SELECTED_FIELD);
  const categoryId = getQuery(QUERY_STRING.OTHER_PARAMS.SELECTED_CATEGORY);

  const fetchData = async (): Promise<string> => {
    const signal = controller.signal;

    // Mock API fetch with signal support
    const response = await fetch(
      API_ROUTES.reference.getCategoryById(refernceId?.toString()),
      {
        signal,
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  };

  const { data: categoryData, isLoading: categoryLoading } = useGetApi<
    IApiResponse<
      {
        id: string;
        name: string;
      }[]
    >
  >({
    key: [
      API_ROUTES.reference.getCategoryById(refernceId?.toString()),
      refernceId,
    ],
    url: API_ROUTES.reference.getCategoryById(refernceId?.toString()),
    enabled: Boolean(refernceId),
    customQueryFn: () => fetchData(),
  });

  const { data, isLoading } = useGetApi<
    IApiResponse<
      {
        id: string;
        name: string;
        value: string;
      }[]
    >
  >({
    key: [
      API_ROUTES.reference.getReferenceByCategory(categoryId?.toString()),
      categoryId,
    ],
    url: API_ROUTES.reference.getReferenceByCategory(categoryId?.toString()),
    enabled: Boolean(categoryId),
  });

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (selectedRefernce) {
    }
  }, [selectedRefernce]);

  const handleChangeReference = (
    e: CheckboxChangeEvent,
    _reference: any,
    index: number
  ) => {
    if (e.target.checked) setReference((prev) => [...prev, _reference]);
    else
      setReference((prev) => {
        prev.splice(index, 1);
        return [...prev];
      });
  };

  return (
    <Drawer {...props.drawerProps}>
      <div className="cs-reference-sidebar">
        <div className="category-list">
          <CSFormSlidingList
            loading={categoryLoading}
            list={categoryData?.data}
            type={QUERY_STRING.OTHER_PARAMS.SELECTED_CATEGORY}
            height={"Calc(-25rem + 100vh)"}
          />
        </div>

        <div className="reference-list">
          {data?.data?.map((reference, index) => (
            <CSCheckbox
              key={reference.id}
              name={reference.value}
              onChange={(e) => handleChangeReference(e, reference, index)}
            >
              {reference.name}
            </CSCheckbox>
          ))}
        </div>

        <div className="preview">
          {reference?.map((ref, i) => (
            <div key={ref?.id} className="item">
              {/* <span className="delete">
                <CloseOutlined
                  onClick={() =>
                    setReference((prev) => {
                      prev.splice(i, 1);
                      return [...prev];
                    })
                  }
                />
              </span> */}
              <div>
                {ref?.value && (
                  <CSRenderSentence
                    value={ref?.value}
                    id={ref.id}
                    setValue={setFinalReference}
                  />
                )}
              </div>
            </div>
          ))}
          <CSButton onClick={() => console.log(finalReference)}>
            Confirm
          </CSButton>
        </div>
      </div>
    </Drawer>
  );
};

export default CSReferenceSidebar;
