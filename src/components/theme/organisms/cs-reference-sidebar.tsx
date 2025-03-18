import { Drawer, DrawerProps, Skeleton } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";
import useQueryString from "../../../hooks/use-query-string";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import useGetApi from "../../../hooks/use-get-api";
import { IApiResponse } from "../../../utils/interface/response.interface";
import CSFormSlidingList from "./cs-form-sliding-list";
import CSRenderSentence from "../molecules/cs-render-sentence";
import CSButton from "../atoms/cs-button";
import CSTextarea from "../atoms/cs-textarea";
import { DeleteOutlined } from "@ant-design/icons";

export type TReference = {
  [key: string]: { id: string; name: string; value: string };
};
export interface ICSReferenceSidebar extends PropsWithChildren {
  drawerProps: DrawerProps;
  setValue: (str: string) => void;
}

const CSReferenceSidebar = (props: ICSReferenceSidebar) => {
  const {
    getQuery,
    // removeQuery
  } = useQueryString();
  const [reference, setReference] = useState<TReference | null>(null);
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

    if (!response?.ok) {
      throw new Error("Network response was not ok");
    }

    return await response?.json();
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
    options: { staleTime: 0, gcTime: 0 },
  });

  useEffect(() => {
    return () => {
      setReference({});
      setFinalSentence("");
      // removeQuery([QUERY_STRING.OTHER_PARAMS.REFERENCE_NAME]);
      controller.abort();
    };
  }, []);

  const handleChangeReference = (_reference: any) => {
    if (!reference?.[_reference.id])
      setReference((prev) => ({
        ...prev,
        [_reference.id]: _reference,
      }));
  };

  const setSentence = (val: string, id: string) => {
    setFinalSentence((prev) => {
      if (prev === "") return prev?.concat(val);
      else return prev?.concat("\n \n", val);
    });
    setReference((prev: TReference | null) => {
      let obj = { ...prev };
      delete obj[id];
      return obj;
    });
  };

  return (
    <Drawer {...props.drawerProps} destroyOnClose>
      <div className="cs-reference-sidebar">
        <div className="category-list">
          <CSFormSlidingList
            loading={categoryLoading}
            list={categoryData?.data}
            type={QUERY_STRING.OTHER_PARAMS.SELECTED_CATEGORY}
            height={"Calc(100vh - 25rem)"}
          />
        </div>

        <div className="category-list" style={{ marginLeft: 5 }}>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                height: "Calc(-25rem + 100vh)",
                paddingTop: 100,
                width: 200,
              }}
            >
              <Skeleton.Input size="small" active />
              <Skeleton.Input size="small" active />
              <Skeleton.Input size="small" active />
            </div>
          ) : (
            <CSFormSlidingList
              loading={categoryLoading}
              list={data?.data}
              type={"slri_d"}
              onSelect={(e: any) => handleChangeReference(e)}
            />
          )}
        </div>

        <div className="preview">
          {!!reference &&
            Object.values(reference)?.map((ref, i) => (
              <div key={ref?.id} className="item">
                <div className="item-sentence">
                  {ref?.value && (
                    <CSRenderSentence
                      key={i + ref.id}
                      value={ref?.value}
                      id={ref.id}
                      setValue={setSentence}
                    />
                  )}
                </div>
                <div className="delete">
                  <CSButton
                    icon={<DeleteOutlined />}
                    type="default"
                    onClick={() =>
                      setReference((prev: TReference | null) => {
                        let obj = { ...prev };
                        delete obj[ref.id];
                        return obj;
                      })
                    }
                  />
                </div>
              </div>
            ))}
          {finalSentence && (
            <div className="final-sentence">
              <CSTextarea
                rows={7}
                value={finalSentence}
                onChange={(e) => setFinalSentence(e.target.value)}
              />
              <CSButton
                htmlType="submit"
                onClick={() => {
                  props.setValue(finalSentence?.replace(/ {2,}/g, " "));
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
