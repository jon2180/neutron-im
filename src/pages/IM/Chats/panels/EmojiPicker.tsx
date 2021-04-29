import { Picker, EmojiData } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export default function EmojiPicker({
  addEmoji,
}: {
  addEmoji: (emoji: EmojiData) => void;
}) {
  return <Picker onSelect={addEmoji} set="apple" />;
}
