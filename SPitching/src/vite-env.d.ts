/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr" />
/// <reference types="vite-plugin-svgr/client" />
declare module '*.svg' {
  import React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
