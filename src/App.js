import React, { useState } from 'react';
import * as DOMPurify from 'dompurify';

import './App.css';

function App() {
  const [message, setMessage] = useState('');

  return (
    <div>
      <input onChange={(e) => setMessage(e.target.value)} />
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message) }} />
    </div>
  );
}

export default App;
