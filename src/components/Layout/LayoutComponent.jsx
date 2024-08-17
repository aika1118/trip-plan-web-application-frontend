import React from 'react';

/**
 * LayoutComponent
 * 
 * App.jsx에서 하위 component에 CSS 적용을 위한 component
 * 
 */

const LayoutComponent = ({ children }) => (
  <div className="d-flex flex-column min-vh-100">
    {children}
  </div>
);

export default LayoutComponent;
