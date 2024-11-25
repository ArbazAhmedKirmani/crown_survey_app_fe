import { useState } from "react";
import {
  extractArrays,
  extractObject,
} from "../../../utils/helper/general.helper";

const CSRenderSentence = ({
  value,
  id,
  setValue,
}: {
  value?: string;
  id: string;
  setValue?: any;
}) => {
  const [selected, setSelected] = useState<any>({});
  const arrays = extractArrays(value!);
  const objects = extractObject(arrays.updatedSentence);
  const data = [...arrays.finalArrays, ...objects.finalArrays];
  const sentence = objects.updatedSentence;

  const handleInputChange = (
    identifier: string,
    value: string,
    type: string
  ) => {
    setSelected((prev: any) => {
      if (type === "checkbox") {
        const result = {
          ...prev,
          [identifier]: prev[identifier]?.includes(value)
            ? prev[identifier].filter((item: string) => item !== value)
            : [...(prev[identifier] || []), value],
        };
        setValue((p: any) => ({ ...p, [id]: result }));
        return result;
      } else if (type === "radio") {
        const result = {
          ...prev,
          [identifier]: value,
        };
        setValue((p: any) => ({ ...p, [id]: result }));
        return result;
      }
      return prev;
    });
  };

  const renderSentence = () => {
    const result = sentence
      .split(/(\*\*0\*\*|\^\^0\^\^)/)
      .map((part, index) => {
        const dataItem = data.find((d) => d.identifier === part);

        if (dataItem) {
          const inputType = part.includes("**") ? "checkbox" : "radio";

          return (
            <span key={part + index}>
              {dataItem.array.map((item) => (
                <label key={item + part} style={{ marginRight: "10px" }}>
                  <input
                    type={inputType}
                    name={inputType === "radio" ? part : undefined}
                    checked={
                      inputType === "checkbox"
                        ? selected[part]?.includes(item) || false
                        : selected[part] === item
                    }
                    onChange={() => handleInputChange(part, item, inputType)}
                  />
                  {item}
                </label>
              ))}
            </span>
          );
        }

        // Render the text part as-is
        return <span key={index}>{part}</span>;
      });
    return result;
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <p>{renderSentence()}</p>
      {/* <h4>Selected Values:</h4>
      <pre>{JSON.stringify(selected, null, 2)}</pre> */}
    </div>
  );
};

export default CSRenderSentence;
