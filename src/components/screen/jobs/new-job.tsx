// import Sider from "antd/es/layout/Sider";

import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { CiOutlined } from "@ant-design/icons";
import useJobs from "./useJobs";
import { ProjectData } from "../../../utils/theme-config";
import { useState } from "react";
import { getItem } from "../../../utils/helpers";

const NewJob = () => {
  const { secondCollapse, firstCollapse, handleCollapse } = useJobs();
  const [selectedFirstForm, setSelectedFirstForm] = useState<string>("0");
  const [selectedSecondForm, setSelectedSecondForm] = useState<string>("0");

  return (
    <div className="new-job-cont">
      <div className="first-list">
        <Sider theme="light" collapsed={firstCollapse}>
          <Button type="text" onClick={() => handleCollapse(1)}>
            <CiOutlined color="black" />
          </Button>
          <Menu
            theme="light"
            items={ProjectData.forms.map((x) =>
              getItem(x.name, x.id.toString(), <strong>{x.prefix}</strong>)
            )}
            selectedKeys={[selectedFirstForm]}
            onClick={({ key }) => setSelectedFirstForm(key)}
            mode="inline"
          />
        </Sider>
      </div>
      <div className="second-list">
        <Sider theme="light" collapsed={secondCollapse}>
          <Button type="text" onClick={() => handleCollapse(2)}>
            <CiOutlined color="black" />
          </Button>
          <Menu
            theme="light"
            items={ProjectData.forms
              .filter((x) => x.id === +selectedFirstForm)?.[0]
              ?.children.map((x) =>
                getItem(x.name, x.id.toString(), <strong>{x.prefix}</strong>)
              )}
            mode="inline"
            selectedKeys={[selectedSecondForm]}
            onClick={({ key }) => setSelectedSecondForm(key)}
          />
        </Sider>
      </div>
      <div className="content-section"></div>
    </div>
  );
};

export default NewJob;
