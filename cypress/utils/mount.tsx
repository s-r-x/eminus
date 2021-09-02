import React from 'react';
import { mount as cypressMount, MountOptions } from '@cypress/react';

export const mount = (jsx: React.ReactNode, opts?: MountOptions) => {
  const App = (
    <>
      <style>
        {`
        html, body {
          margin: 0;
          padding: 0;
        }
        #__cy_root {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .Eminus {
          width: 90%;
        }
      `}
      </style>
      {jsx}
    </>
  );
  return cypressMount(App, opts);
};
