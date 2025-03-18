import { useRef, useState } from "react";
import {
  extractArrays,
  extractObject,
} from "../../../utils/helper/general.helper";
import CSRenderFieldValidator from "../atoms/cs-render-field-validator";
import CSButton from "../atoms/cs-button";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";

const CSRenderSentence = ({
  value,
  setValue,
  id,
  onDelete,
}: {
  value?: string;
  id: string;
  setValue: (selected: any, ind: string) => void;
  onChange?: any;
  onDelete?: () => void;
}) => {
  const sentenceRef = useRef<{ getValue: any }>();
  const [selected, setSelected] = useState<any>({});
  const arrays = extractArrays(value!);
  const objects = extractObject(arrays.updatedSentence);
  const data = [...arrays.finalArrays, ...objects.finalArrays];
  const sentence = objects.updatedSentence;

  return (
    <div className="cs-render-sentence">
      <div className="sentence">
        <CSRenderFieldValidator
          ref={sentenceRef}
          data={data}
          sentence={sentence}
          setSelected={setSelected}
          selected={selected}
        />
      </div>
      <div className="action-btn">
        <div className="confirm">
          <CSButton
            className="sentence-submit"
            htmlType="submit"
            icon={<CheckOutlined />}
            onClick={() => {
              let result = Object.values(sentenceRef.current?.getValue)?.join(
                " "
              );
              setValue(result, id);
            }}
          />
        </div>
        <div className="delete">
          <CSButton
            icon={<DeleteOutlined />}
            type="default"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default CSRenderSentence;
