# Eloquent Chit Chat Integration Demo

This project serves as a demonstration environment for integrating and testing the Eloquent Chit Chat widget.  
It provides a minimal setup that shows how the chat component behaves when embedded in a frontend application.

## Purpose

The integration demo showcases:

- How to install and import the Eloquent Chit Chat package
- How to configure the llmClient used for message generation
- How to manage themes (light or dark)
- Communication with the Express backend for LLM responses

## Live Demo

A live publicly accessible version of this integration project is available at:

https://eloquent-chit-chat-integration.vercel.app/

## Setup

Install dependencies:

`npm install`

Run the development environment:

`npm run dev`

Build for production:

`npm run build`

## Configuration

The integration project expects an environment variable defining the backend endpoint:

`VITE_CHAT_API_URL=https://eloquent-chit-chat-express.onrender.com`

This variable controls where the widget sends LLM messages.

## LLM Client Example

Below is the implementation used by the demo environment:

```typescript
import type { ChatMessage } from '@crdzcode/eloquent-chit-chat';

const API_BASE_URL =
  import.meta.env.VITE_CHAT_API_URL ??
  "https://eloquent-chit-chat-express.onrender.com";

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
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("LLM backend error", res.status, await res.text());
    throw new Error("Failed to retrieve response from backend");
  }

  const data: { reply: string } = await res.json();
  return data.reply;
};
```

## Project Structure

```
/src  
  /assets  
  App.css  
  App.tsx
  index.css
  llmClient.ts
  main.tsx
.env
.gitignore
eslint.config.js
index.html
package-lock.json
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

## Notes

- This project is intended for testing and demonstration only.
- For production use, the integration should be adapted according to your application's structure.
