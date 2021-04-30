import React from "react";
import { Layout } from "antd";
import { Footer } from "./DefaultFooter";
import Header from "./DefaultHeader";
import Helmet from "@/components/Helmet";
import useWindowDimensions from "@/utils/hooks";

export function DefaultFrame({
  children,
  title,
}: {
  children: JSX.Element;
  title?: string;
}) {
  const { height } = useWindowDimensions();

  return (
    <Layout>
      {title ? (
        <Helmet>
          <title>{title}</title>
        </Helmet>
      ) : (
        <span></span>
      )}
      <Header></Header>
      <Layout.Content
        style={{
          minHeight: `${height - 64 - 180}px`,
        }}
      >
        {children}
      </Layout.Content>
      <Footer></Footer>
    </Layout>
  );
}
