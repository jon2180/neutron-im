import React, { useState } from "react";
import { Avatar, Button, Col, Input, Popover, Row } from "antd";
import MdRenderer from "@/components/MdRenderer";
import styles from "./Editor.module.less";
import Helmet from "@/components/Helmet";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/userInfoSlice";
import useWindowDimensions from "@/utils/hooks";

export default function Editor() {
  const [str, setStr] = useState("");
  const userInfo = useSelector(selectUserInfo);
  const [title, setTitle] = useState("");

  const { height } = useWindowDimensions();

  return (
    <div>
      <Helmet>
        <title>{title || "编辑器"}</title>
      </Helmet>
      <div className={styles.metaInfo}>
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          placeholder="请输入文章标题"
          className={styles.titleInput}
        />

        <div className={styles.rightNav}>
          <Button.Group className={styles.btnGroup}>
            <Popover
              content={
                <div>
                  添加分类
                  <div>
                    版权<div>原文链接</div>
                  </div>
                </div>
              }
            >
              <Button type="text">版权</Button>
            </Popover>

            <Popover content={<div>添加标签</div>}>
              <Button type="text">标签</Button>
              {/* <div>分类</div> */}
            </Popover>

            <Popover content={<div>添加分类</div>}>
              <Button type="text">分类</Button>
            </Popover>

            <Button type="primary">发布</Button>
          </Button.Group>

          <Avatar src={userInfo.avatar} size={48} className={styles.avatar} />
        </div>
      </div>

      <Row>
        <Col span={12} className={styles.editorContainer}>
          <Input.TextArea
            value={str}
            onChange={(ev) => {
              setStr(ev.target.value);
              // console.log(ev.target.value);
            }}
            style={{
              height: `${height - 70}px`,
            }}
            className={styles.inputArea}
          ></Input.TextArea>
        </Col>
        <Col
          span={12}
          className={styles.previewContainer}
          style={{
            height: `${height - 70}px`,
          }}
        >
          <MdRenderer>{str}</MdRenderer>
        </Col>
      </Row>
    </div>
  );
}
