import type { HttpResponseData } from '@/types/http';
import { generateAccountId } from '@/utils/generator';
import request from '@/utils/request';

export function postChatAudio(body: {
  blob: Blob;
  name?: string;
}): Promise<HttpResponseData> {
  const data = new FormData();
  data.append(
    'file',
    body.blob,
    body.name && body.name !== '' && body.name.lastIndexOf('.') !== -1
      ? body.name
      : `${generateAccountId({ length: 8 })}.webm`,
  );
  return request.post('/chat-audio', {
    data,
  });
}
