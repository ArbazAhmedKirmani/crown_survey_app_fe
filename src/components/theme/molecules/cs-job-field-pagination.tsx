import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import useQueryString from "../../../hooks/use-query-string";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import CSButton from "../atoms/cs-button";
import { useEffect } from "react";

interface ICSJobFieldPagination {
  data: any[] | undefined;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CSJobFieldPagination = (props: ICSJobFieldPagination) => {
  const { data, index, setIndex } = props;
  const { setQuery, getQuery } = useQueryString();

  const selectedField = getQuery(QUERY_STRING.OTHER_PARAMS.SELECTED_FIELD);

  useEffect(() => {
    if (data?.length) {
      setIndex(() => data?.findIndex((x) => x.id === selectedField));
    }
  }, [data]);

  return (
    data?.[index] && (
      <div className="cs-job-field-pagination">
        <CSButton
          icon={<LeftOutlined />}
          onClick={() => {
            if (data && index !== undefined)
              if (index > 0) {
                setQuery({
                  [QUERY_STRING.OTHER_PARAMS.SELECTED_FIELD]: data?.[index - 1]
                    ?.id as string,
                });
                setIndex((prev: number) => prev! - 1);
              }
          }}
          disabled={index === 0}
        />
        <div
          style={{
            color: "black",
            width: 250,
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          <label>{data?.[index]?.name}</label>
        </div>
        <CSButton
          icon={<RightOutlined />}
          onClick={() => {
            if (data && index !== undefined)
              if (index < data?.length - 1) {
                setQuery({
                  [QUERY_STRING.OTHER_PARAMS.SELECTED_FIELD]: data?.[index + 1]
                    ?.id as string,
                });
                setIndex((prev) => prev! + 1);
              }
          }}
          disabled={index === data.length - 1}
        />
      </div>
    )
  );
};

export default CSJobFieldPagination;
