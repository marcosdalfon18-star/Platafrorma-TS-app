import React, { useEffect, useState } from 'react';
import { type Notification as NotificationType } from '../../types';

const SuccessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ErrorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const ICONS = {
  success: <SuccessIcon />,
  info: <InfoIcon />,
  error: <ErrorIcon />,
};

const STYLES = {
  success: 'bg-white border-l-4 border-[#90BE6D] text-[#415D36]',
  info: 'bg-white border-l-4 border-[#577590] text-[#2D3C4A]',
  error: 'bg-white border-l-4 border-[#F94144] text-[#C42528]',
};

interface NotificationProps {
  notification: NotificationType;
  onClose: (id: number) => void;
}

const Notification: React.FC<NotificationProps> = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mount animation
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Allow animation to finish before removing from DOM
    setTimeout(() => onClose(notification.id), 300);
  };
  
  return (
    <div
      role="alert"
      className={`relative flex items-start p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${STYLES[notification.type]} ${ isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
    >
      <div className="flex-shrink-0">{ICONS[notification.type]}</div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-800">{notification.message}</p>
      </div>
      <button 
        onClick={handleClose} 
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 transition-colors"
        aria-label="Cerrar"
      >
        <span className="sr-only">Cerrar</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </button>
    </div>
  );
};

export default Notification;