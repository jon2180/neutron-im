import React from "react";
import { Layout } from "antd";
import { Footer } from "./DefaultFooter";
import Header from "./DefaultHeader";
import Helmet from "@/components/Helmet";

export function DefaultFrame({
  children,
  title,
}: {
  children: JSX.Element;
  title?: string;
}) {
  const layoutStyle: React.CSSProperties = {
    minHeight: "100vh",
  };

  return (
    <>
      {title ? (
        <Helmet>
          <title>{title}</title>
        </Helmet>
      ) : (
        <span></span>
      )}
      <Layout style={layoutStyle}>
        <Header></Header>
        <Layout.Content>{children}</Layout.Content>
        <Footer></Footer>
      </Layout>
    </>
  );
}
