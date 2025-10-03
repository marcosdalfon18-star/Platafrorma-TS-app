import React from 'react';
const Notification = ({ notification, onClose }: any) => (
  <div>{notification.message}<button onClick={() => onClose(notification.id)}>Cerrar</button></div>
);
export default Notification;