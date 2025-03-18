import { notification, Spin, Upload, UploadProps } from "antd";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import { forwardRef, useImperativeHandle, useState } from "react";
import { UploadFile } from "antd/lib";
import HTTP from "../../../service/http.service";
import { AxiosMethodEnum } from "../../../utils/enum/general.enum";
import { IApiResponse } from "../../../utils/interface/response.interface";
import CSFormItem from "./cs-form-item";
import { AnyObject } from "antd/es/_util/type";
import { AxiosError } from "axios";

export interface ICSUploadReturn {
  getValue: () => IFiles[];
  setValue: (value: IFiles | IFiles[]) => void;
}

export interface ICSUpload extends UploadProps {
  formName: string;
  required: boolean;
  requiredMessage?: string;
  label: string;
}

interface ICSUploadFile extends UploadFile {
  id: string;
}

type IFiles = { id: string; url: string; originalName?: string; name?: string };

const CSUpload = forwardRef((props: ICSUpload, ref) => {
  const _api = new HTTP();
  const [files, setFiles] = useState<IFiles[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useImperativeHandle<unknown, ICSUploadReturn>(ref, () => ({
    getValue: () => files,
    setValue: (value: IFiles | IFiles[]) => {
      const values = Array.isArray(value) ? value : [value];
      setFiles(values);
    },
  }));

  const customPostRequest = (options: AnyObject) => {
    setLoading(true);
    _api
      .call<AnyObject, IApiResponse<IFiles>>({
        method: AxiosMethodEnum.POST,
        url: "http://localhost:3002/" + API_ROUTES.attachment.post,
        body: options,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
      .then((response) => {
        setFiles((prev: IFiles[]) => [
          ...prev,
          {
            id: response.data.data.id,
            url: response.data.data.url,
            name: response.data.data?.originalName,
          },
        ]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const customUpdateRequest = (options: AnyObject, id: string) => {
    setLoading(true);
    _api
      .call<AnyObject, IApiResponse<IFiles>>({
        method: AxiosMethodEnum.PUT,
        url: "http://localhost:3002/" + API_ROUTES.attachment.put(id),
        body: options,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
      .then((response) => {
        setFiles((prev: IFiles[]) => {
          const result = [
            ...prev.map((file) => {
              if (file.id === id)
                return {
                  id: response.data.data.id,
                  url: response.data.data.url,
                  name: response.data.data?.originalName,
                };
              else return file;
            }),
          ];

          setLoading(false);
          return result;
        });
      })
      .catch((err: AxiosError) => {
        console.log(err);
        setLoading(false);
      });
  };

  const customDeleteRequest = (options: AnyObject) => {
    setLoading(true);
    _api
      .call<AnyObject, IApiResponse<{ id: string; url: string }>>({
        method: AxiosMethodEnum.DELETE,
        url:
          "http://localhost:3002/" + API_ROUTES.attachment.delete(options.id),
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
      .then(() => {
        setFiles((prev: IFiles[]) => {
          let state = [...prev];
          state = state.filter((file) => file.id !== options.id);
          return state;
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        notification.error({ message: "Error" });
        setLoading(false);
      });
  };

  const uploadProps: UploadProps = {
    onRemove: customDeleteRequest,
    customRequest: async (options) => {
      if (files.length && !props.multiple)
        customUpdateRequest(options, files?.[0]?.id);
      else customPostRequest(options);
      return options;
    },
    fileList: files as ICSUploadFile[],
  };

  const validateUpload = () => {
    if (props.required) {
      if (files.length > 0) {
        return Promise.resolve();
      }
      return Promise.reject();
    }
    return Promise.resolve();
  };

  return (
    <div className="cs-upload">
      <CSFormItem
        name={props.formName}
        rules={[
          {
            validator: validateUpload,
          },
          {
            required: props?.required || false,
            message: props?.requiredMessage ?? "required",
          },
        ]}
        label={props.label}
      >
        <Spin spinning={loading}>
          <Upload
            {...props}
            {...uploadProps}
            fileList={files as unknown as ICSUploadFile[]}
          >
            {props.children}
          </Upload>
        </Spin>
      </CSFormItem>
    </div>
  );
});

export default CSUpload;
