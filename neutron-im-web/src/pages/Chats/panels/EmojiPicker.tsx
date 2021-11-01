import React from 'react';
import { Picker } from 'emoji-mart';
import type { EmojiData } from 'emoji-mart';
import './EmojiPicker.less';
import { NimSafeAny } from '@/types';

export type EmojiSelectHandler = (
  emoji: EmojiData & {
    native: NimSafeAny;
  },
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
