import React from 'react';

function MyToast({ title, message, type }) {
  const isSuccess = type === 'success';
  return (
    <div className={`toast-custom ${isSuccess ? 'success' : 'danger'}`}>
      <span className="toast-icon">{isSuccess ? '✅' : '❌'}</span>
      <div>
        <div className="toast-title">{title}</div>
        <div className="toast-msg">{message}</div>
      </div>
    </div>
  );
}

export default MyToast;
