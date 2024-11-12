import { Upload, UploadProps } from "antd";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import { useState } from "react";
import { UploadFile } from "antd/lib";
import HTTP from "../../../service/http.service";
import { AxiosMethodEnum } from "../../../utils/enum/general.enum";
import { IApiResponse } from "../../../utils/interface/response.interface";

interface ICSUpload extends UploadProps {
  setIdHandler?: (id: string, name: string) => void;
  document?: { [key: string]: string };
  name: string;
}

const CSUpload = (props: ICSUpload) => {
  const _api = new HTTP();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const customPostRequest = async (options: any) => {
    const response = await _api.call<
      undefined,
      IApiResponse<{ id: string; url: string }>
    >({
      method: AxiosMethodEnum.POST,
      url: "http://localhost:3002/" + API_ROUTES.attachment.post,
      body: options,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });
    if (props?.setIdHandler)
      props.setIdHandler(response.data.data.id, props.name);
    setFileList([options.file]);
    return options;
  };

  const customUpdateRequest = async (options: any, id: string) => {
    const response = await _api.call<
      undefined,
      IApiResponse<{ id: string; url: string }>
    >({
      method: AxiosMethodEnum.PUT,
      url: "http://localhost:3002/" + API_ROUTES.attachment.put(id),
      body: options,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });
    if (props?.setIdHandler)
      props.setIdHandler(response.data.data.id, props.name);
    setFileList([options.file]);
    return options;
  };

  const uploadProps: UploadProps = {
    onRemove: async () => {
      if (props?.document?.[props.name]) {
        await _api.call<undefined, IApiResponse<{ id: string; url: string }>>({
          method: AxiosMethodEnum.DELETE,
          url:
            "http://localhost:3002/" +
            API_ROUTES.attachment.put(props?.document?.[props.name]),
        });
        setFileList([]);
      }
    },
    customRequest: async (options) => {
      if (props?.document?.[props.name])
        customUpdateRequest(options, props.document[props.name]);
      else customPostRequest(options);
    },
    fileList,
  };

  return <Upload {...uploadProps}>{props.children}</Upload>;
};

export default CSUpload;
