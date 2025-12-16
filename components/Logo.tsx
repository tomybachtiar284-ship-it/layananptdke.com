import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/brand-logo.png"
        alt="Daya Karya Energy Logo"
        className="h-10 md:h-20 w-auto object-contain"
      />
    </div>
  );
};