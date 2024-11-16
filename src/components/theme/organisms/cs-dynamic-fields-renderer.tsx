import { Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { forwardRef, useImperativeHandle } from "react";
import CSFormItem from "../atoms/cs-form-item";
import { FormFieldType } from "../../../utils/enum/general.enum";
import CSDynamicField from "../molecules/cs-dynamic-field";

export interface IFormFieldResponse {
  id: string;
  name: string;
  mapperName: string;
  orderNumber: number;
  required: boolean;
  type: FormFieldType;
}

export interface CSDynamicFieldsRenderer {
  list: IFormFieldResponse[] | undefined;
  loading: boolean;
}

const CSDynamicFieldsRenderer = forwardRef(
  (props: CSDynamicFieldsRenderer, ref) => {
    const [form] = useForm();

    useImperativeHandle(ref, () => ({
      getForm: () => form,
    }));

    return (
      <div className="cs-dynamic-fields-renderer">
        <Form layout="vertical" form={form}>
          {props?.list?.map((item: IFormFieldResponse) => (
            <CSFormItem label={item.name} name={item.mapperName}>
              <CSDynamicField type={item.type} nestedProps={item} />
            </CSFormItem>
          ))}
        </Form>
      </div>
    );
  }
);

export default CSDynamicFieldsRenderer;
