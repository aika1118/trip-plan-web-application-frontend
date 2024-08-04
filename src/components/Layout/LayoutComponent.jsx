import React from 'react';

const LayoutComponent = ({ children }) => (
  <div className="d-flex flex-column min-vh-100">
    {children}
  </div>
);

export default LayoutComponent;
