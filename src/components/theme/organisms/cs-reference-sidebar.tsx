import { Drawer, DrawerProps, Spin } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";
import useQueryString from "../../../hooks/use-query-string";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import useGetApi from "../../../hooks/use-get-api";
import { IApiResponse } from "../../../utils/interface/response.interface";
import CSFormSlidingList from "./cs-form-sliding-list";
import CSCheckbox from "../atoms/cs-checkbox";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import CSRenderSentence from "../molecules/cs-render-sentence";
import CSButton from "../atoms/cs-button";
import CSTextarea from "../atoms/cs-textarea";
export interface ICSReferenceSidebar extends PropsWithChildren {
  drawerProps: DrawerProps;
  setValue: (str: string) => void;
}

const CSReferenceSidebar = (props: ICSReferenceSidebar) => {
  const { getQuery } = useQueryString();
  const [reference, setReference] = useState<
    ({ id: string; name: string; value: string } | undefined)[]
  >([]);
  const [finalSentence, setFinalSentence] = useState<string>("");

  const controller = new AbortController();

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
      setReference([]);
      setFinalSentence("");
      controller.abort();
    };
  }, []);

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

  const setSentence = (val: string, ind: number) => {
    setFinalSentence((prev) => {
      let result = prev.concat(prev === "" ? val : "\n \n", val);
      return result;
    });
    setReference((prev: any[]) => {
      let arr = [...prev];
      arr.splice(ind, 1);
      return arr;
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

        <Spin spinning={isLoading}>
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
        </Spin>

        <div className="preview">
          {reference?.map((ref, i) => (
            <div key={ref?.id} className="item">
              <div>
                {ref?.value && (
                  <CSRenderSentence
                    key={i + ref.id}
                    value={ref?.value}
                    id={ref.id}
                    setValue={setSentence}
                    index={i}
                  />
                )}
              </div>
            </div>
          ))}
          {finalSentence && (
            <div>
              <CSTextarea
                rows={6}
                value={finalSentence}
                onChange={(e) => setFinalSentence(e.target.value)}
              />
              <CSButton
                htmlType="submit"
                onClick={() => {
                  props.setValue(finalSentence);
                  setFinalSentence("");
                }}
              >
                Add Response
              </CSButton>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default CSReferenceSidebar;
