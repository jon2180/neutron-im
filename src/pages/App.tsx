import React from "react";

import RouterWrapper from "@/components/RouterWrapper";
import routes from "@/routes";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "@/store/userInfoSlice";

export default function App() {
  const dispatch = useDispatch();
  dispatch(fetchUserInfo());

  return <RouterWrapper routes={routes} />;
}
