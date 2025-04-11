import { PropsWithChildren, useState } from "react";
import CSFormItem from "../atoms/cs-form-item";
import { Checkbox, Radio, Upload, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import CSInput from "../atoms/cs-input";
import { FormFieldType } from "../../../utils/enum/general.enum";
import { IFormFieldResponse } from "../organisms/cs-dynamic-fields-renderer";
import { APP_CONSTANTS } from "../../../utils/constants/app.constant";
import CSDynamicFieldTableElement from "./cs-dynamic-field-table-element";

export interface ICSDynamicField extends PropsWithChildren {
  type?: FormFieldType;
  nestedProps: IFormFieldResponse;
  onChange?: any;
  mutateFn: (val: any) => void;
  formData: Object;
}
const CSDynamicField = ({
  type,
  nestedProps,
  onChange,
  formData,
  mutateFn,
}: ICSDynamicField) => {
  const getTypeField = () => {
    if (type)
      switch (type) {
        case FormFieldType.INPUT:
          return <CSDynamicField.INPUT onChange={onChange} {...nestedProps} />;
        case FormFieldType.CHECKBOX:
          return (
            <CSDynamicField.CHECKBOX onChange={onChange} {...nestedProps} />
          );
        case FormFieldType.RADIO:
          return <CSDynamicField.RADIO onChange={onChange} {...nestedProps} />;
        case FormFieldType.DATE:
          return <CSDynamicField.DATE onChange={onChange} {...nestedProps} />;
        case FormFieldType.TEXTAREA:
          return (
            <CSDynamicField.SENTENCE onChange={onChange} {...nestedProps} />
          );
        case FormFieldType.SENTENCE:
          return (
            <CSDynamicField.SENTENCE onChange={onChange} {...nestedProps} />
          );
        case FormFieldType.ACCOMODATION:
          return (
            <CSDynamicField.ACCOMODATION onChange={onChange} {...nestedProps} />
          );
        case FormFieldType.TABLE_ELEMENT:
          return (
            // <CSDynamicField.TABLE_ELEMENT
            //   onChange={onChange}
            //   {...nestedProps}
            // />
            <CSDynamicFieldTableElement
              nestedProps={nestedProps}
              form={formData}
              mutateFn={mutateFn}
            />
          );
        default:
          break;
      }
  };

  return Boolean(nestedProps?.FormFieldReference?.identifier) ? (
    <CSDynamicField.IDENTIFIER_FIELD />
  ) : (
    <CSFormItem>{getTypeField()}</CSFormItem>
  );
};

CSDynamicField.CHECKBOX = (props: any) => {
  return (
    <CSFormItem
      name={props.mapperName}
      rules={[{ required: props.required, message: "" }]}
    >
      <label>{props?.placeholder}</label>
      <br />
      <Checkbox.Group
        key={props.mapperName}
        name={props.mapperName}
        options={props?.values}
      />
    </CSFormItem>
  );
};
CSDynamicField.SENTENCE = (props: any) => {
  return (
    <CSFormItem
      name={props.mapperName}
      rules={[{ required: props.required, message: "" }]}
    >
      <TextArea rows={9} placeholder={props.placeholder} />
    </CSFormItem>
  );
};
CSDynamicField.RADIO = (props: any) => {
  return (
    <CSFormItem
      name={props.mapperName}
      rules={[{ required: props.required, message: "" }]}
    >
      <label>{props?.placeholder}</label>
      <br />
      <Radio.Group options={props?.values} />
    </CSFormItem>
  );
};
CSDynamicField.INPUT = (props: any) => {
  return (
    <CSFormItem
      name={props.mapperName}
      rules={[{ required: props.required, message: "" }]}
    >
      <CSInput placeholder={props.placeholder} />
    </CSFormItem>
  );
};
CSDynamicField.FILE = (props: UploadProps) => {
  return <Upload {...props} />;
};
CSDynamicField.DATE = (props: any) => {
  return (
    <CSFormItem
      name={props.mapperName}
      rules={[{ required: props.required, message: "" }]}
    >
      <CSInput type="date" />
    </CSFormItem>
  );
};
// CSDynamicField.TABLE_ELEMENT = (props: any) => {
//   const form = useFormInstance();
//   console.log("Form Instance ::: ", form?.getFieldsValue());

//   return (
//     <Form.List name={props.mapperName}>
//       {(fields, { add, remove }) => {
//         return (
//           <div>
//             {fields.map((item, index) => (
//               <div
//                 key={item.key}
//                 style={{ display: "flex", gap: 10, margin: "0 0 10px" }}
//               >
//                 {props?.values?.map?.((x: string, ind: number) => (
//                   <CSFormItem
//                     key={x + ind}
//                     label={x}
//                     name={[index, x]}
//                     // rules={[{ required: props.required, message: "" }]}
//                   >
//                     <CSInput />
//                   </CSFormItem>
//                 ))}
//                 <CSButton
//                   type="text"
//                   style={{ color: "tomato", marginTop: 21 }}
//                   icon={<DeleteOutlined />}
//                   onClick={() => remove(index)}
//                 />
//               </div>
//             ))}
//             <CSButton
//               type="primary"
//               onClick={() => add()}
//               style={{ marginBottom: 10 }}
//             >
//               Add Element
//             </CSButton>
//           </div>
//         );
//       }}
//     </Form.List>
//   );
// };

CSDynamicField.ACCOMODATION = (props: any) => {
  const value = useState(
    props?.value || APP_CONSTANTS.ACCOMODATION.DATA_SET
  )[0];

  return (
    <CSFormItem
      name={props.mapperName}
      rules={[{ required: props.required, message: "" }]}
      initialValue={value}
    >
      <table style={{ borderCollapse: "collapse", border: "1px solid" }}>
        <thead>
          <tr>
            <td></td>
            {APP_CONSTANTS.ACCOMODATION.COL.map((x: string) => (
              <td
                key={x}
                style={{
                  fontWeight: 700,
                  border: "1px solid",
                  padding: "7px 14px",
                }}
              >
                {x}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {value.map?.((row: any, index: number) => (
            <tr key={index + index.toString()}>
              {row?.map?.((col: any, i: number) => {
                const key = Object.keys(col)[0];
                if (i === 0) {
                  return (
                    <>
                      <td
                        key={key + i}
                        style={{
                          fontWeight: 700,
                          border: "1px solid",
                          padding: "7px 14px",
                          width: 130,
                        }}
                      >
                        {key.split("_")[0]}
                      </td>
                      <td
                        key={key + i + index}
                        style={{
                          border: "1px solid",
                        }}
                      >
                        <CSFormItem name={key}>
                          <CSInput
                            type="number"
                            size="large"
                            value={col[key]}
                            style={{ margin: 0 }}
                          />
                        </CSFormItem>
                      </td>
                    </>
                  );
                } else {
                  return (
                    <td
                      key={key + i + index}
                      style={{
                        border: "1px solid",
                      }}
                    >
                      <CSFormItem name={key}>
                        <CSInput
                          size="large"
                          type="number"
                          style={{ margin: 0 }}
                          value={col[key]}
                          // onChange={(e: any) => {
                          //   onChangeHandler(i, index, key, e.target.value);
                          // }}
                        />
                      </CSFormItem>
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </CSFormItem>
  );
};

CSDynamicField.IDENTIFIER_FIELD = () => {
  // const [] =
  return <div>{/* {map(x => <li>{x.name}</li>)} */}</div>;
};

export default CSDynamicField;
