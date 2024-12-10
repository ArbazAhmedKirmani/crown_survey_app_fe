import { Image, notification, UploadProps } from "antd";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import { forwardRef, useImperativeHandle, useState } from "react";
import { UploadFile } from "antd/lib";
import HTTP from "../../../service/http.service";
import { AxiosMethodEnum } from "../../../utils/enum/general.enum";
import { IApiResponse } from "../../../utils/interface/response.interface";
import { AnyObject } from "antd/es/_util/type";
import { AxiosError } from "axios";
import Dragger from "antd/es/upload/Dragger";
import { APP_CONSTANTS } from "../../../utils/constants/app.constant";

export interface ICSDraggerReturn {
  getValue: () => IFiles[];
  setValue: (value: IFiles | IFiles[]) => void;
}

export interface ICSDragger extends UploadProps {
  formName?: string;
  required?: boolean;
  requiredMessage?: string;
  label?: string;
  multiple?: boolean;
  name: string;
}

interface ICSUploadFile extends UploadFile {
  id: string;
}

type IFiles = { id: string; url: string; originalName?: string; name?: string };

const CSDragger = forwardRef((props: ICSDragger, ref) => {
  const _api = new HTTP();
  const [files, setFiles] = useState<IFiles[]>([]);

  useImperativeHandle<unknown, ICSDraggerReturn>(ref, () => ({
    getValue: () => files,
    setValue: (value: IFiles | IFiles[]) => {
      const values = Array.isArray(value) ? [...value] : [value];
      setFiles(values);
    },
  }));

  const customPostRequest = (options: AnyObject) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const customUpdateRequest = (options: AnyObject, id: string) => {
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

          return result;
        });
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  const customDeleteRequest = (options: AnyObject) => {
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
      })
      .catch((err) => {
        console.log(err);
        notification.error({ message: "Error" });
      });
  };

  const uploadProps: UploadProps = {
    onRemove: customDeleteRequest,
    customRequest: async (options) => {
      if (files.length && !props.multiple)
        customUpdateRequest(options, files?.[0]?.id);
      else customPostRequest(options);
      //   return options;
    },
    fileList: files as ICSUploadFile[],
  };

  //   const validateUpload = () => {
  //     if (props.required) {
  //       if (files.length > 0) {
  //         return Promise.resolve();
  //       }
  //       return Promise.reject();
  //     }
  //     return Promise.resolve();
  //   };

  return (
    <Dragger
      style={{ width: "100%" }}
      multiple={props.multiple}
      accept={APP_CONSTANTS.ALLOWED_IMG_EXTENSIONS.join(",")}
      fileList={files as unknown as ICSUploadFile[]}
      showUploadList={false}
      {...props}
      {...uploadProps}
    >
      {files.length ? (
        <div style={{ display: "flex", gap: 10 }}>
          {files.map((file: IFiles) => (
            <div
              key={file.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 70,
                width: 70,
                objectPosition: "center",
                objectFit: "cover",
                overflow: "hidden",
                background: "gray",
              }}
            >
              <Image src={file.url} draggable={false} loading="eager" />
            </div>
          ))}
        </div>
      ) : (
        <p>Add Photos</p>
      )}
    </Dragger>
  );
});

export default CSDragger;
