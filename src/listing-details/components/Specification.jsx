import IconField from '@/components/IconField';
import CarSpecification from '@/Shared/CarSpecification';
import React from 'react';

function Specification({ carDetail }) {
  return (
    <div className="p-10 rounded-xl border shadow-md mt-7">
      {CarSpecification.map((item, index) => (
        <div key={index} className="mt-5 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <IconField icon={item.icon} />
            <h2 className="font-medium">{item.label}</h2>
          </div>
          <h2 className="text-muted-foreground">{carDetail?.[item.name] ?? 'N/A'}</h2>
        </div>
      ))}
    </div>
  );
}

export default Specification;
