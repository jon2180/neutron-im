import React from "react";
import { IActivity } from "@/types/state";
import ActivityLI from "../ActivityListItem";

export interface CodeSnipListItemProps {
  data: IActivity;
}

export default function CodeSnipListItem({ data }: CodeSnipListItemProps) {
  return <ActivityLI item={data} index={1} />;
}
