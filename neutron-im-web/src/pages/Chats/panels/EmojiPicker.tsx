import React from "react";
import { Picker } from "emoji-mart";
import type { EmojiData } from "emoji-mart";
import "./EmojiPicker.less";

export type EmojiSelectHandler = (
  emoji: EmojiData & {
    native: any;
  }
) => void;

export default function EmojiPicker({
  addEmoji,
}: {
  addEmoji: EmojiSelectHandler;
}) {
  return (
    <Picker
      onSelect={addEmoji}
      showPreview={false}
      showSkinTones={false}
      set="apple"
      native={false}
    />
  );
}
