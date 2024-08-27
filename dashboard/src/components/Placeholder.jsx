import React from 'react';

const Placeholder = ({ imageSrc, altText, message }) => {
  return (
    <div className="text-center">
      <img src="/images/image1.jpg" alt="no data" className="mb-4 w-full h-auto"   style={{ width: '80px', height: '80px' }}/>
      <p className=" font-bold text-xs">No Graph Data Available</p>
    </div>
  );
};

export default Placeholder;
