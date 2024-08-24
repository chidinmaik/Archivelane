import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="dot bg-blue-500"></div>
      <div className="dot bg-blue-500"></div>
      <div className="dot bg-blue-500"></div>
    </div>
  );
};

export default Loading;
