
import React from 'react';

declare global {
  interface Window {
    languageChangeTimeout?: NodeJS.Timeout;
  }
}

// Extend React types to include ReactI18NextChildren
declare module 'react' {
  interface ReactNode {
    ReactI18NextChildren?: any;
  }
}

// Ensure ReactI18NextChildren is compatible with ReactNode
declare module 'react-i18next' {
  type ReactI18NextChildren = React.ReactNode;
}

export {};
