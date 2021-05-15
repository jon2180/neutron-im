import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Comment, Input, List, message, Skeleton } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import styles from "./Activity.module.less";
import MdRenderer from "@/components/MdRenderer";
import WideContentWrapper from "@/components/WideContentWrapper/WideContentWrapper";
import { momentService } from "@/services";
import { createSemaphore } from "@/utils/wrapper";
import { useParams } from "react-router";
import type { IActivity } from "@/types/state";

// export interface ActivityInfo {
//   /**
//    * markdow 文本 或纯文本
//    */
//   actions: JSX.Element[];
//   author: string;
//   avatar: string;
//   //  content: JSX.Element;
//   datetime: JSX.Element;
//   content: string;
// }

export interface ContentSectionParams {
  routerParams: ContentRouterParams;
}
const loadingStatus = createSemaphore();
const NOTICE_KEY = "NOTICE_KEY";

function ContentSection({ routerParams }: ContentSectionParams) {
  const [activityInfo, setActivityInfo] = useState<IActivity>({
    author_id: "3",
    content:
      '# 欢迎使用 Cmd Markdown 编辑阅读器\n\n------\n\n我们理解您需要更便捷更高效的工具记录思想，整理笔记、知识，并将其中承载的价值传播给他人，**Cmd Markdown** 是我们给出的答案 —— 我们为记录思想和分享知识提供更专业的工具。 您可以使用 Cmd Markdown：\n\n> * 整理知识，学习笔记\n> * 发布日记，杂文，所见所想\n> * 撰写发布技术文稿（代码支持）\n> * 撰写发布学术论文（LaTeX 公式支持）\n\n![cmd-markdown-logo](https://www.zybuluo.com/static/img/logo.png)\n\n除了您现在看到的这个 Cmd Markdown 在线版本，您还可以前往以下网址下载：\n\n### [Windows/Mac/Linux 全平台客户端](https://www.zybuluo.com/cmd/)\n\n> 请保留此份 Cmd Markdown 的欢迎稿兼使用说明，如需撰写新稿件，点击顶部工具栏右侧的 <i class="icon-file"></i> **新文稿** 或者使用快捷键 `Ctrl+Alt+N`。\n\n------\n\n## 什么是 Markdown\n\nMarkdown 是一种方便记忆、书写的纯文本标记语言，用户可以使用这些标记符号以最小的输入代价生成极富表现力的文档：譬如您正在阅读的这份文档。它使用简单的符号标记不同的标题，分割不同的段落，**粗体** 或者 *斜体* 某些文字，更棒的是，它还可以\n\n### 1. 制作一份待办事宜 [Todo 列表](https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#13-待办事宜-todo-列表)\n\n- [ ] 支持以 PDF 格式导出文稿\n- [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率\n- [x] 新增 Todo 列表功能\n- [x] 修复 LaTex 公式渲染问题\n- [x] 新增 LaTex 公式编号功能\n\n### 2. 书写一个质能守恒公式[^LaTeX]\n\n$$E=mc^2$$\n\n### 3. 高亮一段代码[^code]\n\n```python\n@requires_authorization\nclass SomeClass:\n    pass\n\nif __name__ == \'__main__\':\n    # A comment\n    print \'hello world\'\n```\n\n### 4. 高效绘制 [流程图](https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#7-流程图)\n\n```flow\nst=>start: Start\nop=>operation: Your Operation\ncond=>condition: Yes or No?\ne=>end\n\nst->op->cond\ncond(yes)->e\ncond(no)->op\n```\n\n### 5. 高效绘制 [序列图](https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#8-序列图)\n\n```seq\nAlice->Bob: Hello Bob, how are you?\nNote right of Bob: Bob thinks\nBob-->Alice: I am good thanks!\n```\n\n### 6. 高效绘制 [甘特图](https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#9-甘特图)\n\n```gantt\n    title 项目开发流程\n    section 项目确定\n        需求分析       :a1, 2016-06-22, 3d\n        可行性报告     :after a1, 5d\n        概念验证       : 5d\n    section 项目实施\n        概要设计      :2016-07-05  , 5d\n        详细设计      :2016-07-08, 10d\n        编码          :2016-07-15, 10d\n        测试          :2016-07-22, 5d\n    section 发布验收\n        发布: 2d\n        验收: 3d\n```\n\n### 7. 绘制表格\n\n| 项目        | 价格   |  数量  |\n| --------   | -----:  | :----:  |\n| 计算机     | \\$1600 |   5     |\n| 手机        |   \\$12   |   12   |\n| 管线        |    \\$1    |  234  |\n\n### 8. 更详细语法说明\n\n想要查看更详细的语法说明，可以参考我们准备的 [Cmd Markdown 简明语法手册][1]，进阶用户可以参考 [Cmd Markdown 高阶语法手册][2] 了解更多高级功能。\n\n总而言之，不同于其它 *所见即所得* 的编辑器：你只需使用键盘专注于书写文本内容，就可以生成印刷级的排版格式，省却在键盘和工具栏之间来回切换，调整内容和格式的麻烦。**Markdown 在流畅的书写和印刷级的阅读体验之间找到了平衡。** 目前它已经成为世界上最大的技术分享网站 GitHub 和 技术问答网站 StackOverFlow 的御用书写格式。\n\n---\n\n## 什么是 Cmd Markdown\n\n您可以使用很多工具书写 Markdown，但是 Cmd Markdown 是这个星球上我们已知的、最好的 Markdown 工具——没有之一 ：）因为深信文字的力量，所以我们和你一样，对流畅书写，分享思想和知识，以及阅读体验有极致的追求，我们把对于这些诉求的回应整合在 Cmd Markdown，并且一次，两次，三次，乃至无数次地提升这个工具的体验，最终将它演化成一个 **编辑/发布/阅读** Markdown 的在线平台——您可以在任何地方，任何系统/设备上管理这里的文字。\n\n### 1. 实时同步预览\n\n我们将 Cmd Markdown 的主界面一分为二，左边为**编辑区**，右边为**预览区**，在编辑区的操作会实时地渲染到预览区方便查看最终的版面效果，并且如果你在其中一个区拖动滚动条，我们有一个巧妙的算法把另一个区的滚动条同步到等价的位置，超酷！\n\n### 2. 编辑工具栏\n\n也许您还是一个 Markdown 语法的新手，在您完全熟悉它之前，我们在 **编辑区** 的顶部放置了一个如下图所示的工具栏，您可以使用鼠标在工具栏上调整格式，不过我们仍旧鼓励你使用键盘标记格式，提高书写的流畅度。\n\n![tool-editor](https://www.zybuluo.com/static/img/toolbar-editor.png)\n\n### 3. 编辑模式\n\n完全心无旁骛的方式编辑文字：点击 **编辑工具栏** 最右侧的拉伸按钮或者按下 `Ctrl + M`，将 Cmd Markdown 切换到独立的编辑模式，这是一个极度简洁的写作环境，所有可能会引起分心的元素都已经被挪除，超清爽！\n\n### 4. 实时的云端文稿\n\n为了保障数据安全，Cmd Markdown 会将您每一次击键的内容保存至云端，同时在 **编辑工具栏** 的最右侧提示 `已保存` 的字样。无需担心浏览器崩溃，机器掉电或者地震，海啸——在编辑的过程中随时关闭浏览器或者机器，下一次回到 Cmd Markdown 的时候继续写作。\n\n### 5. 离线模式\n\n在网络环境不稳定的情况下记录文字一样很安全！在您写作的时候，如果电脑突然失去网络连接，Cmd Markdown 会智能切换至离线模式，将您后续键入的文字保存在本地，直到网络恢复再将他们传送至云端，即使在网络恢复前关闭浏览器或者电脑，一样没有问题，等到下次开启 Cmd Markdown 的时候，她会提醒您将离线保存的文字传送至云端。简而言之，我们尽最大的努力保障您文字的安全。\n\n### 6. 管理工具栏\n\n为了便于管理您的文稿，在 **预览区** 的顶部放置了如下所示的 **管理工具栏**：\n\n![tool-manager](https://www.zybuluo.com/static/img/toolbar-manager.jpg)\n\n通过管理工具栏可以：\n\n<i class="icon-share"></i> 发布：将当前的文稿生成固定链接，在网络上发布，分享\n<i class="icon-file"></i> 新建：开始撰写一篇新的文稿\n<i class="icon-trash"></i> 删除：删除当前的文稿\n<i class="icon-cloud"></i> 导出：将当前的文稿转化为 Markdown 文本或者 Html 格式，并导出到本地\n<i class="icon-reorder"></i> 列表：所有新增和过往的文稿都可以在这里查看、操作\n<i class="icon-pencil"></i> 模式：切换 普通/Vim/Emacs 编辑模式\n\n### 7. 阅读工具栏\n\n![tool-manager](https://www.zybuluo.com/static/img/toolbar-reader.jpg)\n\n通过 **预览区** 右上角的 **阅读工具栏**，可以查看当前文稿的目录并增强阅读体验。\n\n工具栏上的五个图标依次为：\n\n<i class="icon-list"></i> 目录：快速导航当前文稿的目录结构以跳转到感兴趣的段落\n<i class="icon-chevron-sign-left"></i> 视图：互换左边编辑区和右边预览区的位置\n<i class="icon-adjust"></i> 主题：内置了黑白两种模式的主题，试试 **黑色主题**，超炫！\n<i class="icon-desktop"></i> 阅读：心无旁骛的阅读模式提供超一流的阅读体验\n<i class="icon-fullscreen"></i> 全屏：简洁，简洁，再简洁，一个完全沉浸式的写作和阅读环境\n\n### 8. 阅读模式\n\n在 **阅读工具栏** 点击 <i class="icon-desktop"></i> 或者按下 `Ctrl+Alt+M` 随即进入独立的阅读模式界面，我们在版面渲染上的每一个细节：字体，字号，行间距，前背景色都倾注了大量的时间，努力提升阅读的体验和品质。\n\n### 9. 标签、分类和搜索\n\n在编辑区任意行首位置输入以下格式的文字可以标签当前文档：\n\n标签： 未分类\n\n标签以后的文稿在【文件列表】（Ctrl+Alt+F）里会按照标签分类，用户可以同时使用键盘或者鼠标浏览查看，或者在【文件列表】的搜索文本框内搜索标题关键字过滤文稿，如下图所示：\n\n![file-list](https://www.zybuluo.com/static/img/file-list.png)\n\n### 10. 文稿发布和分享\n\n在您使用 Cmd Markdown 记录，创作，整理，阅读文稿的同时，我们不仅希望它是一个有力的工具，更希望您的思想和知识通过这个平台，连同优质的阅读体验，将他们分享给有相同志趣的人，进而鼓励更多的人来到这里记录分享他们的思想和知识，尝试点击 <i class="icon-share"></i> (Ctrl+Alt+P) 发布这份文档给好友吧！\n\n------\n\n再一次感谢您花费时间阅读这份欢迎稿，点击 <i class="icon-file"></i> (Ctrl+Alt+N) 开始撰写新的文稿吧！祝您在这里记录、阅读、分享愉快！\n\n作者 [@ghosert][3]     \n2016 年 07月 07日    \n\n[^LaTeX]: 支持 **LaTeX** 编辑显示支持，例如：$\\sum_{i=1}^n a_i=0$， 访问 [MathJax][4] 参考更多使用方法。\n\n[^code]: 代码高亮功能支持包括 Java, Python, JavaScript 在内的，**四十一**种主流编程语言。\n\n[1]: https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown\n[2]: https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#cmd-markdown-高阶语法手册\n[3]: http://weibo.com/ghosert\n[4]: http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference\n\n',
    content_type: 0,
    copyright: "Apache 3",
    create_time: 1617076928000,
    id: "b285a177910c11eb9b0000163e3058e5",
    is_original: 0,
    status: 0,
    title: "React 入门教程（一）",
    update_time: null,
    version: "v0.0.1",
  });
  const [loaded, setLoaded] = useState(false);

  const fetchContentInfo = useCallback(
    async function fetchContentInfo() {
      if (loadingStatus.loading === "pending") return;

      loadingStatus.loading = "pending";
      setLoaded(false);
      const resp = await momentService.getActivity({ id: routerParams.id });
      setLoaded(true);
      loadingStatus.loading = "idle";

      if (resp.status !== 20000 || !resp.data) {
        message.warn(
          {
            key: NOTICE_KEY,
            content: "获取动态失败",
          },
          200
        );
        return;
      }
      setActivityInfo(resp.data as IActivity);
    },
    [routerParams]
  );

  useEffect(() => {
    fetchContentInfo();
  }, [fetchContentInfo]);

  return (
    <Card
      actions={[
        <Button type="text">点赞</Button>,
        <Button type="text">点踩</Button>,
        <Button type="text">分享</Button>,
        <Button type="text">举报</Button>,
      ]}
    >
      <Skeleton loading={!loaded}>
        <div className={styles.metaInfoBox}>
          <Avatar size={56} />
          <div className={styles.detail}>
            <div className={styles.detail_nickname}>nickname</div>
            <div className={styles.aboutActivity}>
              <div>time </div>
              <div>
                <span>
                  {/* 原创  */}
                  {activityInfo.is_original ? "原创" : "转载"}
                </span>
              </div>
              <div>
                {/* 版权信息 */}
                {activityInfo.copyright}
              </div>
              <div>
                <span>{59}</span> 阅读
              </div>
              <div>
                <span>{111}</span> 字数
              </div>
              <div>
                <span>{3}</span> 点赞
              </div>
            </div>
          </div>
        </div>
        <div className={styles.tags}>
          <span className={styles.tagsTitle}>文章标签：</span>
          <span>分享</span>
          <span>心情</span>
          <span>hello</span>
          <span className={styles.tagsTitle}>文章分类：</span>
          <span>分享</span>
          <span>心情</span>
          <span>hello</span>
        </div>

        <div className={styles.originalInfo}>原创信息</div>
        <MdRenderer>{activityInfo.content}</MdRenderer>
      </Skeleton>
    </Card>
  );
}

export interface CommentInfo {
  actions: JSX.Element[];
  author: string;
  avatar: string;
  content: JSX.Element;
}

const WARN_NOTICE_KEY = "WARN_NOTICE_KEY";

export interface CommentsSectionParams {
  routerParams: ContentRouterParams;
}

const commentsLoadingStatus = createSemaphore();

function CommentSection({ routerParams }: CommentsSectionParams) {
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchComments = useCallback(
    async function fetchComents() {
      if (commentsLoadingStatus.loading === "pending") return;

      setLoaded(false);
      loadingStatus.loading = "pending";
      const resp = await momentService.getActivityComments({
        id: routerParams.id,
      });
      loadingStatus.loading = "idle";
      setLoaded(true);

      if (resp.status !== 20000 || !resp.data) {
        message.warn({
          key: WARN_NOTICE_KEY,
          content: "获取评论信息失败",
        });
        return;
      }
      setComments(resp.data as CommentInfo[]);
      // FIXME
    },
    [routerParams]
  );

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <Card className={styles.comments}>
      <Skeleton loading={!loaded}></Skeleton>
      <div>
        <Input.TextArea />
        <Button.Group className={styles.commentButtons}>
          <Button type="primary">提交</Button>
        </Button.Group>
      </div>
      <List
        className="comment-list"
        header={`${comments.length} replies`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item) => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              // datetime={item.datetime}
            />
          </li>
        )}
      />
    </Card>
  );
}

export interface ContentRouterParams {
  id: string;
}
export default function Activity() {
  const params = useParams<ContentRouterParams>();
  return (
    <WideContentWrapper>
      <ContentSection routerParams={params} />
      <CommentSection routerParams={params} />
    </WideContentWrapper>
  );
}
