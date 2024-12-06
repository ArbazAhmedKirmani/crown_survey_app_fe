import { AnyObject } from "antd/lib/_util/type";
import {
  Dispatch,
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useState,
} from "react";
import { toggleStringInArray } from "../../../utils/helper/general.helper";
import { Button, Checkbox, Radio } from "antd";
import { SaveFilled } from "@ant-design/icons";
import CSButton from "./cs-button";

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

const CSRenderFieldValidator = forwardRef(
  (props: ICSRenderFieldValidator, ref) => {
    const [_sentence, _setSentence] = useState<{ [key: string]: string }>(() =>
      props.sentence
        .split(/(\*\*\d+\*\*|\^\^\d+\^\^)/)
        .reduce((prev: any, curr: string, index: number) => {
          prev[index] = curr;
          return prev;
        }, {})
    );

    useImperativeHandle(ref, () => ({
      getValue: _sentence,
    }));

    const handleChange = (e: any, name: string, type: "checkbox" | "radio") => {
      // debugger;
      if (type === "checkbox") {
        props.setSelected((prev: AnyObject) => {
          return {
            ...prev,
            [name]: e,
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
      console.log(_sentence);
    };

    return Object.values(_sentence).map((part: string, index: number) => {
      const dataItem = props.data.find((d: any) => d.identifier === part);

      if (dataItem) {
        const inputType = part.includes("**") ? "checkbox" : "radio";

        return (
          <span key={part + index}>
            {inputType === "checkbox" ? (
              <div style={{ display: "flex", margin: "0 5px" }}>
                <FormItemSelect.Checkbox
                  dataItem={dataItem}
                  part={part}
                  onChange={handleChange}
                />
                <CSButton
                  icon={<SaveFilled />}
                  size="small"
                  type="primary"
                  onClick={() => {
                    _setSentence((prev: any) => {
                      let obj = { ...prev };
                      obj[index] = props.selected?.[part].join(", ");
                      return obj;
                    });
                  }}
                />
              </div>
            ) : (
              <div style={{ display: "flex", margin: "0 5px" }}>
                <FormItemSelect.Radio
                  dataItem={dataItem}
                  part={part}
                  onChange={handleChange}
                />
                <CSButton
                  icon={<SaveFilled />}
                  size="small"
                  type="primary"
                  onClick={() => {
                    _setSentence((prev: any) => {
                      let obj = { ...prev };
                      obj[index] = props.selected?.[part];
                      return obj;
                    });
                  }}
                />
              </div>
            )}
          </span>
        );
      }

      return (
        <p className="validator-p" style={{ margin: "0 2px" }}>
          <span key={index}>{part}</span>
        </p>
      );
    });
  }
);

const FormItemSelect = (props: PropsWithChildren<HTMLInputElement>) => {
  return props.children;
};

FormItemSelect.Checkbox = (props: IFormItemSelect) => {
  return (
    <Checkbox.Group
      options={props.dataItem.array.map((x: any) => ({ label: x, value: x }))}
      onChange={(e) => {
        props.onChange(e, props.part, "checkbox");
      }}
    />
  );
};

FormItemSelect.Radio = (props: IFormItemSelect) => {
  return (
    <Radio.Group
      block={true}
      size="small"
      optionType="button"
      buttonStyle="solid"
      options={props.dataItem.array.map((x: string) => ({
        label: x,
        value: x,
      }))}
      defaultValue="Apple"
      onChange={(e) => props.onChange(e, props.part, "radio")}
    />
  );
  // return props.dataItem.array.map((item: string, ind: number) => (
  //   <label key={ind} style={{ fontWeight: "bold" }}>
  //     <input
  //       key={props.part + ind}
  //       type="radio"
  //       name={props.part}
  //       value={item}
  //       onChange={(e) => props.onChange(e, props.part, "radio")}
  //     />
  //     {item}
  //   </label>
  // ));
};

export default CSRenderFieldValidator;
