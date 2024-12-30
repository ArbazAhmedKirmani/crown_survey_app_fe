import { useRef, useState } from "react";
import {
  extractArrays,
  extractObject,
} from "../../../utils/helper/general.helper";
import CSRenderFieldValidator from "../atoms/cs-render-field-validator";
import CSButton from "../atoms/cs-button";

const CSRenderSentence = ({
  value,
  setValue,
  index,
}: {
  value?: string;
  id: string;
  setValue: (selected: any, ind: number) => void;
  onChange?: any;
  index: number;
}) => {
  const sentenceRef = useRef<{ getValue: any }>();
  const [selected, setSelected] = useState<any>({});
  const arrays = extractArrays(value!);
  const objects = extractObject(arrays.updatedSentence);
  const data = [...arrays.finalArrays, ...objects.finalArrays];
  const sentence = objects.updatedSentence;

  return (
    <div className="cs-render-sentence">
      <CSRenderFieldValidator
        ref={sentenceRef}
        data={data}
        sentence={sentence}
        setSelected={setSelected}
        selected={selected}
      />

      <CSButton
        htmlType="submit"
        onClick={() => {
          let result = Object.values(sentenceRef.current?.getValue)?.join(" ");
          setValue(result, index);
        }}
        style={{ marginInline: 6 }}
      >
        Confirm
      </CSButton>
    </div>
  );
};

export default CSRenderSentence;
