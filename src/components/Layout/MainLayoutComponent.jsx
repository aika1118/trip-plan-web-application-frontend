import React from 'react';

/**
 * MainLayoutComponent
 * 
 * App.jsx에서 하위 component에 CSS 적용을 위한 component
 * 
 */

const MainLayoutComponent = ({ children }) => (
  <div className="flex-grow-1">
    {children}
  </div>
);

export default MainLayoutComponent;
