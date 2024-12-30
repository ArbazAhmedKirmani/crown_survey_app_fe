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
    section: data?.FormSections?.map((section: IFormSection) => ({
      id: section.id,
      name: section.name,
      prefix: section.prefix,
      order: section.order,
      form_field: section?.FormField?.map((field: IFormFields) => ({
        id: field.id,
        name: field.name,
        mapperName: field.mapperName,
        orderNo: field.orderNumber,
        type: field.type,
        placeholder: field.placeholder,
        required: field.required,
        rating: field.rating,
        reference: field.response,
        values: field.values,
        links: field.links,
      })),
    })),
  };
  return result;
};
