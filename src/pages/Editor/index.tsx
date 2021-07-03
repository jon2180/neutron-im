import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Input,
  Popover,
  Row,
  Form,
  FormInstance,
  Switch,
  Radio,
  Spin,
  message,
  Tag,
  Dropdown,
  Avatar,
} from "antd";
import MdRenderer from "@/components/MdRenderer";
import styles from "./Editor.module.less";
import { momentService } from "@/services";
import { createSemaphore } from "@/utils/wrapper";
import { Prompt } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { readJSON, writeJSON } from "@/utils/localStorage";
import { throttle } from "lodash";
import { TextAreaRef } from "antd/lib/input/TextArea";
import avatarNavMenu from "@/layouts/BasicLayout/components/AvatarNavMenu";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/userInfoSlice";

const uploadStatus = createSemaphore();

export interface UploadParams {
  title: string;
  is_original: boolean;
  original_url: string;
  license: string;
  content_type: string;
  tags: string;
  content: string;
}

const defaultUploadProps: UploadParams = {
  title: "",
  is_original: false,
  original_url: "",
  license: "",
  content_type: "activity",
  tags: "",
  content: "",
};

const loadStatus = createSemaphore();

const saveDraft = throttle((fn) => {
  if (fn && typeof fn === "function") fn();
}, 3000);

export default function Editor() {
  const intl = useIntl();
  /** 最后提交的数据中，并不以此值为准，此值用作显示状态切换 */
  const [isOriginal, setIsOriginal] = useState(false);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([] as string[]);
  const [tagInput, setTagInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const formRef = useRef<FormInstance<any>>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<TextAreaRef>(null);
  const userInfo = useSelector(selectUserInfo);

  const switchIsOriginal = () => {
    const nextIsOriginal = formRef.current?.getFieldValue("is_original");
    setIsOriginal(
      nextIsOriginal && typeof nextIsOriginal === "boolean"
        ? nextIsOriginal
        : false
    );
  };

  const loadDraft = useRef(() => {
    if (loadStatus.loading === "pending") return;
    loadStatus.loading = "pending";

    const result = readJSON<UploadParams>("editor.draft");
    console.log(result);
    if (result) {
      const { content, tags, ...rest } = {
        ...defaultUploadProps,
        ...result,
      };
      formRef.current?.setFieldsValue(rest);
      setContent(content);
      setTags(
        tags.split("::").filter((v) => {
          return v && v !== "";
        })
      );
    }
    console.log("loaded draft");
  });

  const save = () => {
    const data = {
      ...defaultUploadProps,
      ...formRef.current?.getFieldsValue(),
      content: content,
      tags: tags.join("::"),
    };
    writeJSON("editor.draft", data);
    console.log("saved draft");
  };

  useEffect(() => {
    setTimeout(() => {
      loadDraft.current();
    });
  }, []);

  const upload: React.MouseEventHandler<HTMLElement> = useCallback(
    async function upload() {
      if (uploadStatus.loading === "pending") return;

      const formValues = formRef.current?.getFieldsValue();
      const values = {
        ...defaultUploadProps,
        ...formValues,
        tags: tags.join("::"),
        content: content,
      } as UploadParams;

      if (
        !values.title ||
        values.title.trim() === "" ||
        !values.content ||
        values.content.trim() === ""
      ) {
        message.warn(
          intl.formatMessage({
            id: "editor.message.no_title_or_content",
            defaultMessage: "Please Input The Title and Content",
          })
        );
        return;
      }

      if (
        values.is_original &&
        (!values.license || values.license.trim() === "")
      ) {
        message.warn(
          intl.formatMessage({
            id: "editor.message.invalid_license",
            defaultMessage: "Invalid License",
          })
        );
        return;
      }

      if (
        !values.is_original &&
        (!values.original_url || values.original_url.trim() === "")
      ) {
        message.warn(
          intl.formatMessage({
            id: "editor.message.empty_original_article_url",
            defaultMessage: "Invalid Original Article Url",
          })
        );
        return;
      }

      setUploading(true);
      uploadStatus.loading = "pending";
      const resp = await momentService.postActivity(values);
      uploadStatus.loading = "idle";
      setUploading(false);

      if (resp.status !== 20000) {
        message.warn(
          intl.formatMessage({
            id: "editor.message.upload_failed",
            defaultMessage: "Upload Failed",
          }),
          0.3
        );
        return;
      }

      localStorage.removeItem("editor.draft");
      message.info(
        intl.formatMessage({
          id: "editor.message.upload_successfully",
          defaultMessage: "Upload Successfully",
        }),
        0.3
      );
      document.location.pathname = "/activities";
    },
    [content, tags, intl]
  );

  const removeTag = (e: number) => {
    if (e >= 0 && e < tags.length) {
      tags.splice(e, 1);
      setTags(tags);
    }
  };

  const whenPrevent = (): boolean => {
    return (
      formRef.current?.getFieldValue("title") !== "" &&
      !!content &&
      content !== ""
    );
  };

  return (
    <div className={styles.container}>
      <Prompt
        when={whenPrevent()}
        message={(location) =>
          intl.formatMessage({
            id: "editor.message.confirm_go_to",
            defaultMessage:
              "Are you sure you want to leave? If you do, your content will discard",
          })
        }
      />

      <Spin spinning={uploading}>
        <div className={styles.metaInfo}>
          <Form
            ref={formRef}
            layout="inline"
            onFieldsChange={saveDraft}
            className={styles.metaRow}
            initialValues={defaultUploadProps}
          >
            <Form.Item name="title" required>
              <Input
                type="text"
                placeholder={intl.formatMessage({
                  id: "editor.form.input_title",
                  defaultMessage: "Please Input Title",
                })}
                className={styles.titleInput}
              />
            </Form.Item>

            <Button.Group className={styles.btnGroup}>
              <Popover
                content={
                  <div>
                    <Form.Item
                      label={intl.formatMessage({
                        id: "editor.label.is_original",
                        defaultMessage: "Original",
                      })}
                      name="is_original"
                    >
                      <Switch
                        checked={isOriginal}
                        onChange={switchIsOriginal}
                      />
                    </Form.Item>

                    <Form.Item
                      label={intl.formatMessage({
                        id: "editor.label.license",
                        defaultMessage: "License",
                      })}
                      name="license"
                      hidden={!isOriginal}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label={intl.formatMessage({
                        id: "editor.label.original_url",
                        defaultMessage: "Original Url",
                      })}
                      name="original_url"
                      hidden={isOriginal}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                }
              >
                <Button type="text">
                  <FormattedMessage
                    id="editor.form.copyright"
                    defaultMessage="Copyright"
                  />
                </Button>
              </Popover>

              <Popover
                content={
                  <div>
                    <Form.Item
                      label={intl.formatMessage({
                        id: "editor.actions.add_tags",
                        defaultMessage: "Add Tags",
                      })}
                      name="tags"
                    >
                      <Input
                        value={tagInput}
                        onChange={(e) => {
                          setTagInput(e.target.value);
                        }}
                        onPressEnter={() => {
                          if (tagInput) {
                            setTags([...tags, tagInput]);
                            setTagInput("");
                            saveDraft(save);
                          }
                        }}
                      />
                    </Form.Item>
                    <div>
                      {tags.map((value, index) => {
                        return (
                          <Tag
                            closable
                            onClose={() => {
                              removeTag(index);
                              saveDraft(save);
                            }}
                            key={value}
                          >
                            {value}
                          </Tag>
                        );
                      })}
                    </div>
                  </div>
                }
              >
                <Button type="text">
                  <FormattedMessage
                    id="editor.form.tags"
                    defaultMessage="Tags"
                  />
                </Button>
              </Popover>

              <Popover
                content={
                  <div>
                    <Form.Item
                      label={intl.formatMessage({
                        id: "editor.form.type",
                        defaultMessage: "Type",
                      })}
                      name="content_type"
                    >
                      <Radio.Group>
                        <Radio.Button value="activity">
                          <FormattedMessage
                            id="menu.activities"
                            defaultMessage="Activities"
                          />
                        </Radio.Button>
                        <Radio.Button value="codesnips">
                          <FormattedMessage
                            id="menu.codesnips"
                            defaultMessage="Code Snipates"
                          />
                        </Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                }
              >
                <Button type="text">
                  <FormattedMessage
                    id="editor.form.type"
                    defaultMessage="Type"
                  />
                </Button>
              </Popover>

              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={upload}>
                  <FormattedMessage
                    id="editor.form.publish"
                    defaultMessage="Publish"
                  />
                </Button>
              </Form.Item>
            </Button.Group>
          </Form>

          <Dropdown overlay={avatarNavMenu}>
            <div className={styles.avatarNav}>
              <Avatar size="small" src={userInfo.avatar} alt="avatar" />
              {/* <span className={classNames(styles.name, "anticon", styles.username)}> */}
              {userInfo.nickname}
              {/* </span> */}
            </div>
          </Dropdown>
        </div>

        <Row className={styles.mainBox}>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            className={styles.editorContainer}
          >
            <Input.TextArea
              value={content}
              ref={editorRef}
              onChange={(ev) => {
                saveDraft(save);
                setContent(ev.target.value);
              }}
              className={styles.inputArea}
            ></Input.TextArea>
          </Col>
          <Col
            xs={0}
            sm={0}
            md={12}
            lg={12}
            className={styles.previewContainer}
            ref={previewRef}
          >
            {document.body.clientWidth > 768 ? (
              <MdRenderer>{content}</MdRenderer>
            ) : (
              <span></span>
            )}
          </Col>
        </Row>
      </Spin>
    </div>
  );
}
