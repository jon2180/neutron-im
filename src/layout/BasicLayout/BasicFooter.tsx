import React from "react";
import { Layout } from "antd";
import { NavLink } from "react-router-dom";

import styles from "./index.module.less";

const quickCenter = {
  name: "快捷中心",
  list: [
    {
      text: "最近动态",
      path: "/activities",
      icon: null,
    },
    {
      text: "代码分享",
      path: "/codesnips",
      icon: null,
    },
    {
      text: "探索",
      path: "/search",
      icon: null,
    },
    {
      text: "聊天",
      path: "/im",
      icon: null,
    },
  ],
};

const friendLinks = {
  name: "友情链接",
  list: [
    {
      text: "Github",
      path: "//github.com/",
      icon: null,
    },
    {
      text: "Ant Design",
      path: "//ant.design",
      icon: null,
    },
    {
      text: "Typora",
      path: "//typora.io/",
      icon: null,
    },
    {
      text: "Wuog 个人博客",
      path: "//wuog.top",
      icon: null,
    },
  ],
};

const aboutUs = {
  name: "关于我们",
  list: [
    {
      text: "Github - jon2180",
      path: "//github.com/jon2180",
      icon: null,
    },
    {
      text: "E-Mail",
      path: "mailto:763653451@qq.com",
      icon: null,
    },
  ],
};

export default function BasicFooter() {
  return (
    <Layout.Footer>
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.navGroup}>
            <div className={styles.linksTitle}>{quickCenter.name}</div>
            <ul className={styles.nav1}>
              {quickCenter.list.map((val, ind) => {
                return (
                  <li key={`link${ind}`}>
                    <NavLink to={val.path} target="_blank">
                      {val.text}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.navGroup}>
            <div className={styles.linksTitle}>{friendLinks.name}</div>
            <ul className={styles.nav2}>
              {friendLinks.list.map((val, ind) => {
                return (
                  <li key={`link${ind}`}>
                    <NavLink to={val.path} target="_blank">
                      {val.text}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.navGroup}>
            <div className={styles.linksTitle}>{aboutUs.name}</div>
            <ul className={styles.nav3}>
              {aboutUs.list.map((val, ind) => {
                return (
                  <li key={`link${ind}`}>
                    <NavLink to={val.path} target="_blank">
                      {val.text}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          &copy;2021 Neutron IM All Right Reserved
        </div>
      </div>
    </Layout.Footer>
  );
}
