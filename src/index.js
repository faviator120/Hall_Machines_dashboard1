import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App"; // Import the App component
import { UserProvider } from './UserContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UserProvider>
);
