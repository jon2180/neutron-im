import React, { useState } from "react";
import Picker, { IEmojiData } from "emoji-picker-react";

type EmojiOnClick = (
  event: React.MouseEvent<Element, MouseEvent>,
  data: IEmojiData
) => void;

export default function EmojiPicker() {
  const [chosenEmoji, setChosenEmoji] = useState(null as null | IEmojiData);

  const onEmojiClick: EmojiOnClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <div>
      {chosenEmoji ? (
        <span>You chose: {chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )}
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
}

// import { Picker, EmojiData } from "emoji-mart";
// import "emoji-mart/css/emoji-mart.css";
// // const addEmoji = console.log;
// export function EmojiPicker({
//   addEmoji,
// }: {
//   addEmoji: (emoji: EmojiData) => void;
// }) {
//   return <Picker onSelect={addEmoji} set="apple" />;
// }
