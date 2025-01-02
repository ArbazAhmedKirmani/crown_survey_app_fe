import { AnyObject } from "antd/lib/_util/type";
import {
  Dispatch,
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useState,
} from "react";
import CSButton from "./cs-button";
import { Checkbox, Radio } from "antd";

interface IFormItemSelect {
  part: string;
  dataItem: AnyObject;
  onChange: (e: any, name: string, type: "checkbox" | "radio") => void;
  selected?: any[];
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
    };

    return Object.values(_sentence).map((part: string, index: number) => {
      const dataItem = props.data.find((d: any) => d.identifier === part);

      if (dataItem) {
        const inputType = part.includes("**") ? "checkbox" : "radio";

        return (
          <span key={part + index} className="cs-render-field-validator">
            {inputType === "checkbox" ? (
              <div style={{ display: "flex", margin: "0 5px" }}>
                <FormItemSelect.Checkbox
                  dataItem={dataItem}
                  part={part}
                  onChange={handleChange}
                  selected={props.selected[part]}
                />
                <CSButton
                  icon={"✓"}
                  size="small"
                  type="primary"
                  onClick={() => {
                    _setSentence((prev: any) => {
                      let obj = { ...prev };
                      obj[index] = props.selected?.[part].join(", ");
                      return obj;
                    });
                    console.log("props.selected: ", props.selected);
                  }}
                />
                <CSButton
                  icon={"×"}
                  size="small"
                  onClick={() => {
                    props.setSelected((prev: AnyObject) => {
                      const result = {
                        ...prev,
                      };
                      delete result[part];
                      return result;
                    });
                    console.log("props.selected: ", props.selected);
                  }}
                />
              </div>
            ) : (
              <div style={{ display: "flex", margin: "0 5px" }}>
                <FormItemSelect.Radio
                  dataItem={dataItem}
                  part={part}
                  onChange={handleChange}
                  selected={props.selected[part]}
                />
                <CSButton
                  icon={"✓"}
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
                <CSButton
                  icon={"×"}
                  size="small"
                  onClick={() => {
                    props.setSelected((prev: AnyObject) => {
                      const result = {
                        ...prev,
                      };
                      delete result[part];
                      return result;
                    });
                    console.log("props.selected: ", props.selected);
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
      value={props.selected}
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
      value={props.selected}
      block={true}
      size="small"
      buttonStyle="solid"
      optionType="button"
      options={props.dataItem.array.map((x: string) => ({
        label: x,
        value: x,
      }))}
      onChange={(e) => {
        props.onChange(e, props.part, "radio");
      }}
    />
  );
};

export default CSRenderFieldValidator;
