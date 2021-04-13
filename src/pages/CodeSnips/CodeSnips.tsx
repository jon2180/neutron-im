// import React, { useState } from "react";
// import { postAccountLogin } from "@/services/user";
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
      // sider={<FriendsSider />}
      content={<div>helloworld, this is codesnips</div>}
      detailPath={detailPath}
      detailExact={detailExact}
    />
  );
}
