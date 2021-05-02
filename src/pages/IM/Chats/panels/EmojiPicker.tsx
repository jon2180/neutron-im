import { Picker, EmojiData } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export type EmojiSelectHandler = (emoji: EmojiData & {
  native: any
}) => void;

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
