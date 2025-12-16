import React from 'react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = service.icon;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-900 flex flex-col h-full group hover-card">
      <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
        <Icon className="w-8 h-8 text-blue-900" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow leading-relaxed">
        {service.description}
      </p>
      {service.kbliCodes && (
        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 font-mono">
            KBLI: {service.kbliCodes.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};