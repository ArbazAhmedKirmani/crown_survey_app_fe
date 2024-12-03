import { AnyObject } from "antd/lib/_util/type";
import { Dispatch, PropsWithChildren, useState } from "react";
import { toggleStringInArray } from "../../../utils/helper/general.helper";

interface IFormItemSelect {
  part: string;
  dataItem: AnyObject;
  onChange: (e: any, name: string, type: "checkbox" | "radio") => void;
}
interface ICSRenderFieldValidator {
  sentence: string;
  data: AnyObject;
  onChange?: any;
  setSelected: Dispatch<any>;
  selected: AnyObject;
}

const CSRenderFieldValidator = (props: ICSRenderFieldValidator) => {
  const [_sentence, _setSentence] = useState<{ [key: string]: string }>(() =>
    props.sentence
      .split(/(\*\*\d+\*\*|\^\^\d+\^\^)/)
      .reduce((prev: any, curr: string, index: number) => {
        prev[index] = curr;
        return prev;
      }, {})
  );

  const handleChange = (e: any, name: string, type: "checkbox" | "radio") => {
    if (type === "checkbox") {
      props.setSelected((prev: AnyObject) => {
        const arr = toggleStringInArray(prev?.[name], e.target.name);
        return {
          ...prev,
          [name]: arr,
        };
      });
    } else {
      props.setSelected((prev: AnyObject) => {
        return {
          ...prev,
          [name]: e.target.value,
        };
      });
    }
  };

  return Object.values(_sentence).map((part: string, index: number) => {
    const dataItem = props.data.find((d: any) => d.identifier === part);

    if (dataItem) {
      const inputType = part.includes("**") ? "checkbox" : "radio";

      return (
        <span key={part + index}>
          {inputType === "checkbox" ? (
            <FormItemSelect.Checkbox
              dataItem={dataItem}
              part={part}
              onChange={handleChange}
            />
          ) : (
            <FormItemSelect.Radio
              dataItem={dataItem}
              part={part}
              onChange={handleChange}
            />
          )}
        </span>
      );
    }

    return (
      <p className="validator-p">
        <span key={index}>&nbsp; {part}</span>
      </p>
    );
  });
};

const FormItemSelect = (props: PropsWithChildren<HTMLInputElement>) => {
  return props.children;
};

FormItemSelect.Checkbox = (props: IFormItemSelect) => {
  return props.dataItem.array.map((item: string, ind: number) => (
    <label key={ind} style={{ fontWeight: "bold" }}>
      <input
        name={item}
        type="checkbox"
        onChange={(e) => props.onChange(e, props.part, "checkbox")}
      />
      {item}
    </label>
  ));
};

FormItemSelect.Radio = (props: IFormItemSelect) => {
  return props.dataItem.array.map((item: string, ind: number) => (
    <label key={ind} style={{ fontWeight: "bold" }}>
      <input
        key={props.part + ind}
        type="radio"
        name={props.part}
        value={item}
        onChange={(e) => props.onChange(e, props.part, "radio")}
      />
      {item}
    </label>
  ));
};

export default CSRenderFieldValidator;
