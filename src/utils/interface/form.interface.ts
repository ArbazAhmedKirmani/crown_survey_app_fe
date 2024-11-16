export interface IFormFields {
  id: string;
  name: string;
  mapperName: string;
  orderNumber: number;
  type: string;
  required: boolean;
}

export interface IFormSection {
  id: string;
  name: string;
  prefix: string;
  order: number;
  description: string;
  FormField: IFormFields[];
}

export interface IFormGetById {
  id: number;
  name: string;
  prefix: string;
  document: {
    id: string;
    originalName: string;
    url: string;
  };
  desc: string;
  FormSections: IFormSection[];
}
