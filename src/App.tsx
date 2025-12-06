// src/App.tsx
import { useState } from 'react';

// nome vindo do "name" do package.json da lib
import { EloquentChitChat } from '@crdzcode/eloquent-chit-chat';
// importa o CSS gerado pela lib (ajuste o caminho se for outro)
import '@crdzcode/eloquent-chit-chat/dist/index.css';

// Se você exporta tipos:
import { llmClient } from './llmClient';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [status, setStatus] = useState<'maintenance' | 'online' | 'offline'>('online');

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', height: '200vh', overflowY: 'auto' }}>
      <h1>Eloquent Chit Chat Demo</h1>
      <p>Testing the embeddable chat widget from the local .tgz package.</p>

      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{marginRight: 16, outline: 'none'}}>
        Toggle Theme
      </button>

      <button onClick={() => setStatus(status === 'online' ? 'maintenance' : status === 'maintenance' ? 'offline' : 'online')}>
        Toggle Status
      </button>

      {/* O widget fica flutuante, então você só precisa renderizar ele uma vez */}
      <EloquentChitChat
        title="Chit Chat"
        llmClient={llmClient}
        initialMessages={[
          {
            id: 'welcome',
            role: 'assistant',
            content: 'Hello! I am your Eloquent Chit Chat assistant 🤖',
          },
        ]}
        theme={theme}
        status={status}
      />
    </div>
  );
}

export default App;
