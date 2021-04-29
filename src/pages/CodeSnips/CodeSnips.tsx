import React from "react";
import CombinedPage from "@/pages/IM/CombinedPage";

export default function CodeSnips({
  detailPath,
  detailExact,
}: {
  detailPath: string;
  detailExact: boolean;
}) {
  return (
    <CombinedPage
      content={<div>helloworld, this is codesnips</div>}
      detailPath={detailPath}
      detailExact={detailExact}
    />
  );
}
