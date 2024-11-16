import {
  IFormFields,
  IFormGetById,
  IFormSection,
} from "../interface/form.interface";

export const formMapper = (data: IFormGetById) => {
  const result = {
    form_name: data.name,
    form_prefix: data.prefix,
    form_document: data?.document?.id,
    form_description: data.desc,
    form_section: data?.FormSections?.map((section: IFormSection) => ({
      id: section.id,
      name: section.name,
      prefix: section.prefix,
      order: section.order,
      form_fields: section?.FormField?.map((field: IFormFields) => ({
        id: field.id,
        name: field.name,
        mapper: field.mapperName,
        orderNo: field.orderNumber,
        type: field.type,
      })),
    })),
  };
  return result;
};
