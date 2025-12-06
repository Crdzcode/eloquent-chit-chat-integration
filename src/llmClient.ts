// src/llmClient.ts
import type { ChatMessage } from '@crdzcode/eloquent-chit-chat';

const API_BASE_URL = import.meta.env.VITE_CHAT_API_URL ?? 'http://localhost:3000';

export const llmClient = async ({
  messages,
}: {
  messages: ChatMessage[];
}): Promise<string> => {
  const payload = {
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  };

  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error('LLM backend error', res.status, await res.text());
    throw new Error('Failed to get response from LLM backend');
  }

  const data: { reply: string } = await res.json();
  return data.reply;
};
