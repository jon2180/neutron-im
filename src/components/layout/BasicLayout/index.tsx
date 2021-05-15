import React from "react";
import { Layout } from "antd";
import BasicFooter from "./BasicFooter";
import BaiscHeader from "./BasicHeader";
import { Helmet } from "react-helmet-async";

const layoutStyle: React.CSSProperties = {
  minHeight: "100vh",
};

export default function BasicLayout({
  children,
  title,
}: {
  children: JSX.Element;
  title?: string;
}) {
  return (
    <>
      {title && (
        <Helmet>
          <title>{title || "Nuetron IM"}</title>
        </Helmet>
      )}
      <Layout style={layoutStyle}>
        <BaiscHeader></BaiscHeader>
        <Layout.Content>{children}</Layout.Content>
        <BasicFooter></BasicFooter>
      </Layout>
    </>
  );
}
